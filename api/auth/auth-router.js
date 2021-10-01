const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model.js');

const tokenBuilder = require('./token-builder.js');

router.post('/register', (req, res, next) => {
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

router.post('/login', (req, res, next) => {
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
