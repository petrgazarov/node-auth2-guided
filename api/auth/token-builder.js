const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secrets');

//----------------------------------------------------------------------------//
// This is a helper method that handles token signing. This is where we create
// a new token. JWT consists of a Header, a Payload and a Signature. Note that
// by default, the Payload (as well as the Header) are not encrypted. They are
// base64 encoded which can be easily decoded by anyone without the secret.
// Be sure not to store any sensitive data in the Payload (unless you encrypt
// it first).
//----------------------------------------------------------------------------//
module.exports = function (user) {
  const payload = {
    sub: user.id,
    username: user.username,
    // This could be more sophisticated. A hierarchy of privileges could be
    // established, and an entire library for managing rights. This is not a
    // new problem, and many creative patterns and packages have been created to
    // solve it (the ability to manage privileges/roles, etc). If you are
    // interested, look up these topics:
    //    * Role-based access control (RBAC)
    //      https://en.wikipedia.org/wiki/Role-based_access_control
    //    * Access Control List (ACL)
    //      https://en.wikipedia.org/wiki/Access-control_list
    role: user.role,
  }

  // The syntax for specifing an expiration time with jsonwebtoken package is
  // somewhat intuitive. In addition to this ASCII/text method, you could
  // calculate "Seconds Since Epoch", which is known through Unix-like systems
  // as the number of elapsed seconds since midnight, January 1, 1970, in the
  // UTC timezone (aka GMT). See https://en.wikipedia.org/wiki/Epoch_(computing)
  // Note that specifying an "expires in" value specifies an amount of time that
  // must elapse for the token to be considered "expired". 
  //
  // For instructions you should follow (both on the client and server side)
  // with respect to JWT's,  you should read the RFC (Request For Comments)
  // document that defines the JWT format and use. See
  // https://tools.ietf.org/html/rfc7519. 
  // 
  // For an understanding of what an RFC is, enjoy this little bit of light
  // reading: https://en.wikipedia.org/wiki/Request_for_Comments 
  // 
  // See section 4.1.4, as well as the definition of "NumericDate" in Section 2.
  // If you think that managing time on computers and across the Internet and
  // around the world is simple, you have not studied the topic... dive in, have
  // fun! 
  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, JWT_SECRET, options);
};
