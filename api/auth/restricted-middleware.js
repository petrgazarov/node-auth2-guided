const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
  // the react sent us the token in a Authorization header
  const token = req.headers.authorization
  if (!token) {
    return next({ status: 401, message: 'you serious? No token??' })
  }
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: `your token sucks: ${}`})
    }
  })
};
