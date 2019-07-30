const _ = require('lodash')

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
const MAX_AUDIO_SIZE = process.env.MAX_AUDIO_SIZE || 5 * 1024 * 1024
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_VOICE_NOTES_BUCKET = process.env.AWS_VOICE_NOTES_BUCKET

if (_.isNil(AWS_ACCESS_KEY_ID)) throw new Error('AWS_ACCESS_KEY_ID is not set')
if (_.isNil(AWS_SECRET_ACCESS_KEY)) throw new Error('AWS_SECRET_ACCESS_KEY is not set')
if (_.isNil(AWS_VOICE_NOTES_BUCKET)) throw new Error('AWS_VOICE_NOTES_BUCKET is not set')

module.exports = {
  port: PORT,
  environment: NODE_ENV,
  logLevel: LOG_LEVEL,
  maxAudioSize: MAX_AUDIO_SIZE,
  awsAccessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsS3VoiceNotesBucket: AWS_VOICE_NOTES_BUCKET
}
