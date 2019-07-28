const _ = require('lodash')

const errorHandler = (err, req, res, next) => {
  if (_.isNil(err)) return next()
  if (res.headersSent) return next(err)
  const payload = Object.assign({}, err.output.payload, err.data)
  if (req.app.get('env') !== 'production') Object.assign(payload, { stack: err.stack })
  return res.status(err.output.statusCode).json(payload)
}

module.exports = errorHandler
