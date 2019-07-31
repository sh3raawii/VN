const _ = require('lodash')
const Notification = require('../models/Notification')

/**
 * List notifications
 * @param {String} recieverId filter by recieverId
 * @param {Number} limit number of notifications to return
 * @param {String} after pagination key _id property of notification document
 * @param {Boolean} read filter by the read flag, if not specified it will return all the notifications
 */
const getNotifications = async (recieverId, limit, after, read) => {
  const query = {}
  if (!_.isNil(recieverId)) query.recieverId = recieverId
  if (!_.isNil(after)) query._id = { $gt: after }
  if (_.isBoolean(read)) query.isRead = read
  return Notification.find(query).sort({ _id: 1 }).limit(limit)
}

/**
 * Create a new notification
 * @param {String} senderId sender id
 * @param {String} recieverId reciever id
 * @param {String} voiceNotePath audio file path or key in cloud storage
 */
const createNotification = async (senderId, recieverId, voiceNotePath) => {
  const notification = new Notification({
    senderId: senderId,
    recieverId: recieverId,
    voiceNotePath: voiceNotePath
  })
  return notification.save()
}

module.exports = {
  getNotifications,
  createNotification
}
