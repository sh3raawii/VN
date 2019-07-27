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
    app.use(express.urlencoded({extended: true}))

    // Routers
    // mounting health checks
    logger.debug(`mounting health check endpoints`)
    app.use('/health', require('./routes/health'))

    return app
}

module.exports = {
    createApp
}