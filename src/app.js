const express = require('express')
const compression = require('compression')
const logger = require('./utils/logger')

const createApp = (config) => {
  const app = express()

  // setting app properties
  logger.debug(`creating an express app with the following configurations ${config}`)
  app.set('env', config.environment)

  // Middlewares
  logger.debug(`mounting application middlewares`)
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Set up custom middlewares
  logger.debug(`mounting custom middlewares`)
  // http request logger
  logger.debug(`mounting http request logger`)
  app.use(require('./middlewares/request_logger'))

  // Routers
  // mounting health checks
  logger.debug(`mounting health check endpoints`)
  app.use('/health', require('./routes/health'))
  // mounting upload router
  logger.debug(`mounting upload router endpoints`)
  app.use('/upload', require('./routes/upload'))

  // Error Middlewares
  logger.debug(`Mounting error middlewares`)
  // Boomify errors
  app.use(require('./middlewares/boomify_errors'))
  // log errors
  app.use(require('./middlewares/error_logger'))
  // handle errors
  app.use(require('./middlewares/error_handler'))

  return app
}

module.exports = {
  createApp
}
