const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = function (user) {
  const payload = {
    subject: user.id,
    
  }
}
