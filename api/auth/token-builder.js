const jwt = require('jsonwebtoken');
const secret = 'secret string';

module.exports = function (user) {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  }

  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secret, options);
};