const multer = require('multer')
const config = require('../config')

const uploadOgg = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype === 'audio/ogg')
  },
  limits: {
    fileSize: config.maxAudioSize
  }
})

module.exports = uploadOgg
