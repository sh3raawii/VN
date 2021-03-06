const _ = require('lodash')
// TODO: Implement a Schema for config so that things don't get out of hand

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
const MAX_AUDIO_SIZE = process.env.MAX_AUDIO_SIZE || 5 * 1024 * 1024
const MONGODB_URI = process.env.MONGODB_URI
const MONGOOSE_POOL_SIZE = process.env.MONGOOSE_POOL_SIZE || 10
const DEBUG_MONGOOSE = process.env.DEBUG_MONGOOSE || false
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_VOICE_NOTES_BUCKET = process.env.AWS_VOICE_NOTES_BUCKET
const AWS_VOICE_NOTES_SQS_URL = process.env.AWS_VOICE_NOTES_SQS_URL
const AWS_PUSH_NOTIFICATIONS_SQS_URL = process.env.AWS_PUSH_NOTIFICATIONS_SQS_URL
const AWS_SOCKETS_NOTIFICATIONS_SQS_URL = process.env.AWS_SOCKETS_NOTIFICATIONS_SQS_URL
const SCHEDULE_SERVICE_BASE_URL = process.env.SCHEDULE_SERVICE_BASE_URL

// Validation
if (_.isNil(MONGODB_URI)) throw new Error('MONGODB_URI is not set')
if (_.isNil(AWS_ACCESS_KEY_ID)) throw new Error('AWS_ACCESS_KEY_ID is not set')
if (_.isNil(AWS_SECRET_ACCESS_KEY)) throw new Error('AWS_SECRET_ACCESS_KEY is not set')
if (_.isNil(AWS_VOICE_NOTES_BUCKET)) throw new Error('AWS_VOICE_NOTES_BUCKET is not set')
if (_.isNil(AWS_VOICE_NOTES_SQS_URL)) throw new Error('AWS_VOICE_NOTES_SQS_URL is not set')
if (_.isNil(AWS_PUSH_NOTIFICATIONS_SQS_URL)) throw new Error('AWS_PUSH_NOTIFICATIONS_SQS_URL is not set')
if (_.isNil(AWS_SOCKETS_NOTIFICATIONS_SQS_URL)) throw new Error('AWS_SOCKETS_NOTIFICATIONS_SQS_URL is not set')
if (_.isNil(SCHEDULE_SERVICE_BASE_URL)) throw new Error('SCHEDULE_SERVICE_BASE_URL is not set')

module.exports = {
  port: PORT,
  environment: NODE_ENV,
  logLevel: LOG_LEVEL,
  maxAudioSize: MAX_AUDIO_SIZE,
  mongodbURI: MONGODB_URI,
  mongoosePoolSize: MONGOOSE_POOL_SIZE,
  debugMongoose: DEBUG_MONGOOSE,
  awsAccessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsS3VoiceNotesBucket: AWS_VOICE_NOTES_BUCKET,
  awsSQSVoiceNotesUrl: AWS_VOICE_NOTES_SQS_URL,
  awsSQSPushNotificationsUrl: AWS_PUSH_NOTIFICATIONS_SQS_URL,
  awsSQSSocketsNotificationsUrl: AWS_SOCKETS_NOTIFICATIONS_SQS_URL,
  scheduleServiceBaseUrl: SCHEDULE_SERVICE_BASE_URL
}
