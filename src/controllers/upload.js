const _ = require('lodash')
const boom = require('@hapi/boom')
const uuidv4 = require('uuid/v4')
const wrapAsyncController = require('../utils/async-wrapper')

const notif = require('../lib/notifications')
const storage = require('../lib/storage')

const uploadVoiceNote = async (req, res) => {
  if (_.isNil(req.file)) throw boom.badRequest('Missing or incorrect file format')

  const filename = uuidv4()
  await storage.uploadVoiceNote(req.file.buffer, filename)
  await notif.createNotification(`Sender${Math.random().toString(36).substring(7)}`, `Rec${Math.random().toString(36).substring(7)}`, filename)

  res.status(201).json('Voice note is submitted successfully')
}

module.exports = {
  uploadVoiceNote: wrapAsyncController(uploadVoiceNote)
}
