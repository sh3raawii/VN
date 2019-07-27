const express = require('express')
const router = express.Router()

const health = require('../controllers/health')

router.get('/', health.liveness)
router.get('/readiness', health.readiness)

module.exports = router