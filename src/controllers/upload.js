const _ = require('lodash')
const boom = require('@hapi/boom')
const wrapAsyncController = require('../utils/async-wrapper')

const uploadVoiceNote = async (req, res) => {
  if (_.isNil(req.file)) throw boom.badRequest('Missing or incorrect file format')
  res.status(201).json('Voice note is submitted successfully')
}

module.exports = {
  uploadVoiceNote: wrapAsyncController(uploadVoiceNote)
}
