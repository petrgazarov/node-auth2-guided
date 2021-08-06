const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model.js');
const checkAuthPayload = require('./check-payload-middleware');
const tokenBuilder = require('./token-builder.js');

//----------------------------------------------------------------------------//
// Register endpoint hashes the user-provided password, and saves the hash to
// the database.
//----------------------------------------------------------------------------//
router.post('/register', checkAuthPayload, (req, res, next) => {
  let user = req.body;

  // bcrypt-ing the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
  const hash = bcrypt.hashSync(user.password, rounds);

  // never save the plain text password in the db
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` });
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
});

//----------------------------------------------------------------------------//
// When someone successfully authenticates, reward them with a token, so they
// don't have to authenticate again. 
//----------------------------------------------------------------------------//
router.post('/login', checkAuthPayload, (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username }) // it would be nice to have middleware do this
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user);

        res.status(200).json({
          message: `Welcome back ${user.username}!`,
          token,
        });
      } else {
        next({ status: 401, message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});

module.exports = router;
