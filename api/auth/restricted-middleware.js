const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../../config/secrets");

//----------------------------------------------------------------------------//
// A method to verify that an authorization token is included as a header, and
// that the token is 1) valid, and 2) not expired. (jsonwebtoken checks for
// expired tokens automatically.)
// 
// A "valid" token is one where the payload+our_secret, when hashed with the
// correct hashing algorithm (specified in the JWT header), produces the same
// "signature" (cryptographic hash) as the one in the token. 
// 
// Remember that it is not possible for someone to create and store in the token
// the same hash that jsonwebtoken() will create when verifying the token,
// unless they use the same "secret", because jsonwebtoken() is going to use our
// secret to create a hash to compare to the signature in the JWT (because we
// are going to give it our secret.) If the signature in the JWT was created
// with some other secret key, or without one, the signature in the JWT will not
// match the one that is created by jsonwebtoken().
//----------------------------------------------------------------------------//
module.exports = (req, res, next) => {
  // Get the token from the authorization header.
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: 'No token??' });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: 'Invalid token!' });
    }

    req.decodedToken = decodedToken;
    next();
  });
};