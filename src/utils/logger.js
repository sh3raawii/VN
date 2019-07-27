const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { service: 'voice-notes-notification-service' },
    transports: [
        new winston.transports.Console()
    ]
})

module.exports = logger