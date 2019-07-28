const logger = require('./utils/logger')
const config = require('./config')
const { createApp } = require('./app')
const app = createApp(config)

const server = app.listen(config.port, () => {
  logger.info(`server started on port ${config.port} with env set to ${app.get('env')}`)
})

module.exports = {
  server
}
