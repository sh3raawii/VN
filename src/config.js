const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    port: PORT,
    environment: NODE_ENV
}