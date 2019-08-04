const { createApp } = require('../src/app')
const config = require('../src/config')

const testingApp = createApp(config)

module.exports = testingApp
