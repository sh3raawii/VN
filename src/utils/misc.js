const _ = require('lodash')

/**
 * Parse boolean from a string
 * @param {String} str string to be parsed eg. 'true', 'True', 'FALSE'
 * @returns {Boolean|null} returns Boolean if success otherwise null
 */
const parseBoolean = (str) => {
  if (!_.isString(str)) return null
  const val = str.toLowerCase()
  if (val === 'true') return true
  else if (val === 'false') return false
  else return null
}

module.exports = {
  parseBoolean
}
