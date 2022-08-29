const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const {getProfile,updateProfile} = require("./profile.controller");

router.get("/profile",checkToken,getProfile);
router.patch("/profile",checkToken,updateProfile);

module.exports = router;