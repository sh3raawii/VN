const _ = require('lodash')
const boom = require('@hapi/boom')

const wrapAsyncController = require('../utils/async-wrapper')
const { parseBoolean } = require('../utils/misc')
const { streamVoiceNote } = require('../lib/storage')
const { getNotifications, getNotification, markNotificationAsRead } = require('../lib/notifications')

const list = async (req, res) => {
  // TODO: Implement a decent paginator to be reusable
  let limit = parseInt(req.query.limit)
  limit = _.isInteger(limit) && limit > 0 ? Math.min(100, limit) : 10
  if (_.isNil(req.query.user)) throw boom.badRequest('Missing user') // assume we have the user in the query instead of the token for now
  if (!_.isNil(req.query.read) && !_.isBoolean(parseBoolean(req.query.read))) throw boom.badRequest('read should be a Boolean')
  const notifications = await getNotifications(req.query.user, limit, req.query.after, parseBoolean(req.query.read))
  res.status(200).json(notifications)
}

const read = async (req, res, next) => {
  const notificationId = req.params.id
  const userId = req.query.user // assume we have the user in the query instead of the token for now
  const notification = await getNotification(notificationId)
  if (_.isNil(notification)) throw boom.notFound('Notification not found')
  if (notification.recieverId !== userId) throw boom.forbidden('You are not allowed to view this notification')
  if (!notification.isRead) await markNotificationAsRead(notification)
  streamVoiceNote(notification.voiceNotePath).on('error', next).pipe(res)
}

module.exports = {
  list: wrapAsyncController(list),
  read: wrapAsyncController(read)
}
