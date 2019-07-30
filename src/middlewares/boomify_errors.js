const _ = require('lodash')
const boom = require('@hapi/boom')

/**
 * Express middleware to convert the propagated error to Boom error.
 * Use this middleware as the first middleware after all routers.
 * @param {Error} err Express caught error
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 * @example
 * // Mount an endpoint on the express app
 * app.use('/', (req, res, next) => res.status(200).json("Ok"))
 * // Mount the boomifyError middleware before any other error handeling middleware
 * app.use(boomifyError)
 */
const boomifyError = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  if (!(err instanceof Error)) err = new Error(err)
  return next(boom.isBoom(err) ? err : boom.boomify(err))
}

module.exports = boomifyError
