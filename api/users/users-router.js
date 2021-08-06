const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

const onlyAdmin = (req, res, next) => {
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
