const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const NotificationSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  },
  voiceNotePath: {
    type: String,
    required: true
  },
  at: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    required: false
  }
}, { timestamps: true })

NotificationSchema.index({ recieverId: 1 })
NotificationSchema.index({ voiceNotePath: 1 })

NotificationSchema.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
  validateBeforeDelete: false
})

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification
