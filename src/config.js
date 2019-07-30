const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
const MAX_AUDIO_SIZE = process.env.MAX_AUDIO_SIZE || 5 * 1024 * 1024

module.exports = {
  port: PORT,
  environment: NODE_ENV,
  logLevel: LOG_LEVEL,
  maxAudioSize: MAX_AUDIO_SIZE
}
