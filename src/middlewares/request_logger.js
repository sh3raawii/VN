const expressWinston = require('express-winston')
const logger = require('../utils/logger')

const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  colorize: false
})

module.exports = requestLoggerMiddleware
