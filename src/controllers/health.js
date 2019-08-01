const wrapAsyncController = require('../utils/async-wrapper')

const liveness = async (req, res) => {
  res.json('Server is up and running chief')
}

const readiness = async (req, res) => {
  // TODO: Check that S3 credentials are correct and MongoDB is up and running first
  res.json('Server is ready to accept requests chief')
}

module.exports = {
  liveness: wrapAsyncController(liveness),
  readiness: wrapAsyncController(readiness)
}
