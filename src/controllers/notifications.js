const _ = require('lodash')
const boom = require('@hapi/boom')

const wrapAsyncController = require('../utils/async-wrapper')
const { getNotifications, getNotification, markNotificationAsRead } = require('../lib/notifications')
const { streamVoiceNote } = require('../lib/storage')

const list = async (req, res) => {
  // TODO: Implement a decent paginator to be reusable
  // limit is by default 10 and is capped by 100
  const limit = _.isInteger(req.query.limit) && req.query.limit > 0 ? Math.min(100, req.query.limit) : 10
  if (!_.isNil(req.query.read) && !_.isBoolean(req.query.read)) throw boom.badRequest('read should be a Boolean')
  // assume we have the user in the query instead of the token for now
  const notifications = await getNotifications(req.query.user, limit, req.query.after, req.query.read)
  res.status(200).json(notifications)
}

const read = async (req, res) => {
  const notificationId = req.params.id
  const userId = req.query.user // assume we have the user in the query instead of the token for now
  const notification = await getNotification(notificationId)
  if (notification.recieverId !== userId) throw boom.forbidden('You are not allowed to view this notification')
  if (!notification.isRead) await markNotificationAsRead(notification)
  streamVoiceNote(notification.voiceNotePath).pipe(res)
}

module.exports = {
  list: wrapAsyncController(list),
  read: wrapAsyncController(read)
}
