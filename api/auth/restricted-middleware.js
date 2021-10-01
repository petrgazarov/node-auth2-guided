const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: 'No token?' });
  } else {
    jwt.verify(token, JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        next({ status: 401, message: err.message });
      } else {
        req.decodedToken = decodedToken;
      }
    });
  }

  next();
};
