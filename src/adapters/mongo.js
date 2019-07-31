const mongoose = require('mongoose')
const config = require('../config')
const logger = require('../utils/logger')

mongoose.connect(config.mongodbURI, {
  readPreference: 'secondaryPreferred',
  poolSize: config.mongoosePoolSize,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useCreateIndex: true
}).catch(err => {
  logger.error(`Failed to make initial connection to Mongodb ${err}`)
  process.exit(1)
})

mongoose.set('debug', config.debugMongoose)

// Connection Events Logging
mongoose.connection.on('connected', () => {
  logger.info(`Connected to Mongodb on ${config.mongodbURI}`)
})

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongodb connection is disconnected')
})

mongoose.connection.on('reconnected', () => {
  logger.info(`Reconnected to Mongodb on ${config.mongodbURI}`)
})

mongoose.connection.on('error', (err) => {
  logger.error(`Mongodb connection error ${err}`)
  process.exit(1)
})

mongoose.connection.on('all', () => {
  logger.info(`Successfully connected to all Mongodb servers`)
})

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Closed Mongodb connection through app termination')
  })
  process.exit(0)
})

module.exports = mongoose
