const winston = require('winston')
const config = require('../config')

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'voice-notes-notification-service' },
  transports: [
    new winston.transports.Console({
      silent: config.environment === 'test'
    })
  ]
})

module.exports = logger
