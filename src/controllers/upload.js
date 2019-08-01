const _ = require('lodash')
const boom = require('@hapi/boom')
const wrapAsyncController = require('../utils/async-wrapper')
const { voiceNotesSQS } = require('../adapters/sqs')

const uploadVoiceNote = async (req, res) => {
  if (_.isNil(req.file)) throw boom.badRequest('Missing or incorrect file format')
  const pilotId = req.query.user // assume we have the user in the query instead of the token for now
  const scheduleId = req.body.scheduleId
  await voiceNotesSQS.enqueueOne({
    workerJobType: 'notify_customers_with_vn',
    data: {
      pilotId: pilotId,
      scheduleId: scheduleId,
      voiceNote: req.file
    }
  })
  res.status(201).json('Voice note is submitted successfully')
}

module.exports = {
  uploadVoiceNote: wrapAsyncController(uploadVoiceNote)
}
