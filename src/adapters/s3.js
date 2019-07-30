const aws = require('aws-sdk')
const config = require('../config')

const s3 = new aws.S3({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey
})

module.exports = s3
