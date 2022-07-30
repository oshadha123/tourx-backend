const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  
  login
 
} = require("./login.controller");

router.post("/login", login);


module.exports = router;
