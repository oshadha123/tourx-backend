const router = require("express").Router();

const {
  login
} = require("./login.controller");

router.post("/login", login);

module.exports = router;