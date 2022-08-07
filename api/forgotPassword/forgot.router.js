const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  resetPasswordWithoutLogin,
  resetPassword
} = require("./forgot.controller");

router.post("/forgot", resetPasswordWithoutLogin);
router.post("/forgot/:userId", checkToken, resetPassword);
// router.patch("/forgot/:")

module.exports = router;