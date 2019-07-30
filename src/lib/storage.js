const config = require('../config')
const s3 = require('../adapters/s3')

/**
 * Upload a voice note to Cloud Storage
 * @async
 * @param {Buffer} buffer file buffer
 * @param {String} key file full path or name
 * @todo use S3's upload() instead of putObject()
 * @todo implement a prefix schema to achieve a higher performance (increase request per second rate limit)
 * @see {@link https://docs.aws.amazon.com/AmazonS3/latest/dev/optimizing-performance.html| AWS documentation}
 * @example
 * const clip = fs.readFileSync('./recording1.ogg')
 * uploadVoiceNote(clip, 'clip.ogg')
 */
const uploadVoiceNote = async (buffer, key) => {
  return s3.putObject({
    Bucket: config.awsS3VoiceNotesBucket,
    Key: key,
    Body: buffer
  }).promise()
}

/**
 * Downloads the voice note with the given key from Cloud Storage
 * @param {String} key file full path or name
 * @async
 * @example
 * downloadVoiceNote('clip.ogg')
 */
const downloadVoiceNote = async (key) => {
  return s3.getObject({
    Bucket: config.awsS3VoiceNotesBucket,
    key: key
  }).promise()
}

module.exports = {
  uploadVoiceNote,
  downloadVoiceNote
}
