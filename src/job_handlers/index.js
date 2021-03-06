const _ = require('lodash')
const aws = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const logger = require('../utils/logger')
const { createNotifications, deleteVoiceNoteNotification } = require('../lib/notifications')
const { uploadVoiceNote } = require('../lib/storage')
const { pushNotificationsSQS, socketsNotificationsSQS } = require('../adapters/sqs')
const { getUpcomingCustomers } = require('../adapters/schedule_service')

/**
 * Send a notification to all upcoming customers in a delivery schedule through both push notifications and sockets
 * @async
 * @param {Object} data notification data
 * @param {String} data.pilotId pilot id
 * @param {String} data.scheduleId schedule id
 * @param {Object} data.voiceNote voice note data
 * @param {Buffer} data.voiceNote.buffer audio buffer
 */
const notifyCustomers = async (data) => {
  // Validation
  if (_.isNil(data.pilotId)) throw new Error('pilotId is not found')
  if (_.isNil(data.scheduleId)) throw new Error('scheduleId is not found')
  if (_.isNil(data.voiceNote)) throw new Error('voiceNote is not found')
  if (_.isNil(data.voiceNote.buffer)) throw new Error('voiceNote.buffer is not found')
  // get list of customers to be notified
  const customers = await getUpcomingCustomers(data.pilotId, data.scheduleId)
  if (!_.isArray(customers)) throw new Error('Incorrect response from delivery schedule service, not an arrary')
  if (customers.length === 0) return
  // Create unique identifier to the voicenote
  const filename = uuidv4()
  let notifications = null
  try {
    // Doing it in parallel to speed things up
    [notifications] = await Promise.all([
      createNotifications(data.pilotId, customers, filename),
      uploadVoiceNote(data.voiceNote.buffer, filename)
    ])
  } catch (error) {
    // if it failed to upload the voice note roll back the notifications
    if (error instanceof aws.AWSError) {
      logger.error(`Failed to upload the voice note, rolling back the notifications... ${error}`)
      await deleteVoiceNoteNotification(filename)
      throw error
    } else {
      logger.error(`Failed to save some notifications to the database ${error}`)
    }
  }
  // enqueue jobs to send push notifications and socket notifications
  const dataPayloads = notifications.map(notification => _.pick(notification, ['_id', 'senderId', 'recieverId', 'voiceNotePath', 'at']))
  const pushNotificationsPayloads = dataPayloads.map(d => Object.assign({ workerJobType: 'voice_note_notification' }, { data: d }))
  const socketsNotificationsPayloads = dataPayloads.map(d => Object.assign({ workerJobType: 'voice_note_notification' }, { data: d }))
  try {
    await Promise.all([
      pushNotificationsSQS.enqueueMany(pushNotificationsPayloads),
      socketsNotificationsSQS.enqueueMany(socketsNotificationsPayloads)
    ])
  } catch (error) {
    logger.error(`Failed to send notification instantly ${error}`)
  }
}

module.exports = {
  notifyCustomers
}
