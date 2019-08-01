const rp = require('request-promise-native')
const config = require('../config')

/**
 * Fetch the upcoming customers in a particular schedule for a certain pilot
 * @async
 * @param {String} pilotId
 * @param {String} scheduleId
 * @returns {Array<String>} customer Ids
 */
const getUpcomingCustomers = async (pilotId, scheduleId) => {
  return rp({
    uri: `${config.scheduleServiceBaseUrl}/schedule/${scheduleId}/upcoming`,
    qs: {
      pilot: pilotId
    },
    json: true
  })
}

module.exports = {
  getUpcomingCustomers
}
