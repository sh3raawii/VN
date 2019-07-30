const express = require('express')
const router = express.Router()

const uploadController = require('../controllers/upload')
const uploadOgg = require('../middlewares/upload_ogg')

router.post('/', uploadOgg.single('clip'), uploadController.uploadVoiceNote)
router.use(require('../middlewares/multer_error_handler'))

module.exports = router
