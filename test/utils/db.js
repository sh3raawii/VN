const faker = require('faker')
const moment = require('moment')
const models = require('../../src/models')

/**
 * Remove all documents in every collection for every model defined under /src/models
 */
const cleanUpDatabase = async () => {
  return Promise.all(Object.values(models).map(model => model.deleteMany({})))
}

/**
 * Generate Notification with custom parameters for test purposes
 * @param {Object} notificationData Object that may contain some Notification properties defined in the Model
 * @param {String} notificationData.senderId sender id
 * @param {String} notificationData.recieverId reciever id
 * @param {String} notificationData.voiceNotePath file id
 * @param {Date} notificationData.at time of sending the notification
 * @param {Boolean} notificationData.isRead is notification already read
 * @param {Date} notificationData.readAt time of reading the notification
 */
const generateNotification = async (notificationData = {}) => {
  const notification = new models.Notification({
    senderId: notificationData.senderId || faker.random.uuid(),
    recieverId: notificationData.recieverId || faker.random.uuid(),
    voiceNotePath: notificationData.voiceNotePath || faker.random.uuid(),
    at: notificationData.at || moment.utc(),
    isRead: notificationData.isRead,
    readAt: notificationData.readAt
  })
  return notification.save()
}

module.exports = {
  cleanUpDatabase,
  generateNotification
}
