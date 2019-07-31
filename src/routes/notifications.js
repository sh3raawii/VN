const express = require('express')
const router = express.Router()
const notificationsController = require('../controllers/notifications')

router.get('/', notificationsController.list)
router.post('/:id/read', notificationsController.read)

module.exports = router
