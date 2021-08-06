const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

const onlyAdmin = (req, res, next) => {
  // 1. Read token data from decoded JWT
  // 2. Check if role is admin. If it is, proceed. If it is not, then terminate the request with a 403.

  const { decodedToken } = req;

  if (decodedToken.role !== 'admin') {
    next({ status: 403, message: 'Sorry pal, not allowed.' });
  } else {
    next();
  }
}

router.get("/", restricted, onlyAdmin, (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
});

module.exports = router;
