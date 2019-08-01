const { WTSQS } = require('wtsqs')
const config = require('../config')

const voiceNotesSQS = new WTSQS({
  url: config.awsSQSVoiceNotesUrl,
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey
})

const pushNotificationsSQS = new WTSQS({
  url: config.awsSQSPushNotificationsUrl,
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey
})

const socketsNotificationsSQS = new WTSQS({
  url: config.awsSQSSocketsNotificationsUrl,
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey
})

module.exports = {
  voiceNotesSQS,
  pushNotificationsSQS,
  socketsNotificationsSQS
}
