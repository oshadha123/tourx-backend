const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  resetPasswordWithoutLogin,
  resetPassword,
  updatePassword
} = require("./forgot.controller");

router.post("/forgot", resetPasswordWithoutLogin);
router.patch("/forgot",updatePassword);
router.patch("/forgot/loggedIn", checkToken, resetPassword);

module.exports = router;