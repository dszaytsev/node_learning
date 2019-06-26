const crypto = require('crypto')

module.exports.generateID = () => crypto.randomBytes(16).toString('hex')

