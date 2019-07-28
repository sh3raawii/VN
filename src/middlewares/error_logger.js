const expressWinston = require('express-winston')
const logger = require('../utils/logger')

const requestLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
  level: (req, res, err) => err.isServer ? 'error' : 'warn'
})

module.exports = requestLoggerMiddleware
