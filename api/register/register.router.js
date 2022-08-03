const router = require("express").Router();

const {register} = require("./login.controller");


router.post("/", register);

module.exports = router;