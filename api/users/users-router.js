const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const onlyAdmin = require('../auth/restrict-only-admin');

router.get("/", restricted, onlyAdmin, (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
});

module.exports = router;
