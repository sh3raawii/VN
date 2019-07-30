const _ = require('lodash')

/**
 * Express middleware to handle errors.
 * This is typically the last middleware in the application.
 * @param {Error} err Express caught error
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 * @example
 * app.use(errorHandler)
 */
const errorHandler = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  if (res.headersSent) return next(err)
  const payload = Object.assign({}, err.output.payload, err.data)
  if (req.app.get('env') !== 'production') Object.assign(payload, { stack: err.stack })
  return res.status(err.output.statusCode).json(payload)
}

module.exports = errorHandler
