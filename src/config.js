const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

module.exports = {
    port: PORT,
    environment: NODE_ENV,
    logLevel: LOG_LEVEL
}