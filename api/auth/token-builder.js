const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = require('../config/secrets');

const buildToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  }

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, JWT_TOKEN, options);
};

module.exports = buildToken;