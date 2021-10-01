const jwt = require('jsonwebtoken');

const buildToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  }

  const secret = 'secret';

  const options = {
    expiresIn: '1d' }
  ;

  return jwt.sign(payload, secret, options);
};

module.exports = buildToken;