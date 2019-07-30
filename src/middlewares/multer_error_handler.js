const _ = require('lodash')
const boom = require('@hapi/boom')
const multer = require('multer')

/**
 * Express middleware to catch multer errors, convert the error to Boom error and set the statusCode to 400.
 * Use this middleware after the endpoints that use Multer.
 * @param {Error} err Express caught error
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 * @example
 * app.use(handleMulterError)
 */
const handleMulterError = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  else if (err instanceof multer.MulterError) return next(boom.boomify(err, { statusCode: 400 }))
  else return next(err)
}

module.exports = handleMulterError
