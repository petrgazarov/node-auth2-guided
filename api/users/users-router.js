const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

// authentication (who you are)
// authorization (what you have rights to access)
function onlyAdmin(req, res, next) {
  const { decodedJwt } = req
  if (decodedJwt.role === 'admin') {
    next()
  } else {
    next({ status: 403, message: 'you cannot touch this!' })
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
