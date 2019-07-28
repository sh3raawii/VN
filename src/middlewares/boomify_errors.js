const _ = require('lodash')
const boom = require('@hapi/boom')

const boomifyError = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  if (!(err instanceof Error)) err = new Error(err)
  return next(boom.isBoom(err) ? err : boom.boomify(err))
}

module.exports = boomifyError
