const router = require("express").Router();

const {signUp,verify} = require("./register.controller");


//router.post("/", register);
router.post("/", signUp);
router.patch("/verify", verify);

module.exports = router;