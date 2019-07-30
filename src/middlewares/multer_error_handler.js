const _ = require('lodash')
const boom = require('@hapi/boom')
const multer = require('multer')

const handleMulterError = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  else if (err instanceof multer.MulterError) return next(boom.boomify(err, { statusCode: 400 }))
  else return next(err)
}

module.exports = handleMulterError
