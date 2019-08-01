// Connect to mongodb
require('./adapters/mongo')

const _ = require('lodash')
const { WTSQSWorker } = require('wtsqs')
const { voiceNotesSQS } = require('./adapters/sqs')
const jobHandler = require('./job_handlers')
const logger = require('./utils/logger')

// Add the job type here and its handler
const jobsDictionary = {
    'notify_customers_with_vn': jobHandler.notify_customers
}

const handler = async (job) => {
    // get the job namespace
    if (_.isNil(job.body.workerJobType)) throw new Error('No workerJobType Specified')
    // get the appropriate job handler
    const _handler = jobsDictionary[job.body.workerJobType]
    if (!_.isFunction(_handler)) throw new Error(`No handler found for ${job.body.workerJobType}`)
    // log and process the job
    logger.info(`Processing job [${job.body.workerJobType}] (${job.id})`)
    try {
      await _handler(job.body.data)
      logger.info(`Successfully processed job [${job.body.workerJobType}] (${job.id})`)
    } catch (e) {
      logger.error(`Error processing job [${job.body.workerJobType}] (${job.id}) with data ${job.body.data} Error ${e}`)
      throw e
    }
}

// Create a worker and run it
const worker = new WTSQSWorker({ voiceNotesSQS, logger })
worker.run(handler)

// Gracefully shutown the worker
process.on('SIGTERM', async () => {
    logger.info('Shutting down worker')
    await worker.shutdown()
    process.exit(0)
})