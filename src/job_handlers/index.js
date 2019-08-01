const _ = require('lodash')
const aws = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const logger = require('../utils/logger')
const { createNotifications, deleteVoiceNoteNotification } = require('../lib/notifications')
const { uploadVoiceNote } = require('../lib/storage')
const { pushNotificationsSQS, socketsNotificationsSQS } = require('../adapters/sqs')

const notify_customers = (data) => {
    // Validation
    if (_.isNil(data.pilotId)) throw new Error('pilotId is not found')
    if (_.isNil(data.scheduleId)) throw new Error('scheduleId is not found')
    if (_.isNil(data.voiceNote)) throw new Error('voiceNote is not found')
    if (_.isNil(data.voiceNote.buffer)) throw new Error('voiceNote.buffer is not found')
    // get list of customers to be notified
    const customers = []
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
        }
        else {
            logger.error(`Failed to save some notifications to the database ${error}`)
        }
    }
    // enqueue jobs to send push notifications and socket notifications
    const dataPayloads = notifications.map(notification => _.pick(notification, ['_id', 'senderId', 'recieverId', 'voiceNotePath', 'at'])) 
    const pushNotificationsPayloads = dataPayloads.map(d => Object.assign({workerJobType: 'voice_note_notification'}, {data: d}))
    const socketsNotificationsPayloads = dataPayloads.map(d => Object.assign({workerJobType: 'voice_note_notification'}, {data: d}))
    await Promise.all([
        pushNotificationsSQS.enqueueMany(pushNotificationsPayloads),
        socketsNotificationsSQS.enqueueMany(socketsNotificationsPayloads)
    ])
}

module.exports = {
    notify_customers
}