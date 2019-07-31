const _ = require('lodash')
const boom = require('@hapi/boom')

const wrapAsyncController = require('../utils/async-wrapper')
const { getNotifications } = require('../lib/notifications')

const list = async (req, res) => {
  // TODO: Implement a decent paginator to be reusable

  // limit is by default 10 and is capped by 100
  const limit = _.isInteger(req.query.limit) && req.query.limit > 0 ? Math.min(100, req.query.limit) : 10
  if (!_.isNil(req.query.read) && !_.isBoolean(req.query.read)) throw boom.badRequest('read should be a Boolean')

  const notifications = await getNotifications(req.query.user, limit, req.query.after, req.query.read)
  res.status(200).json(notifications)
}

module.exports = {
  list: wrapAsyncController(list)
}
