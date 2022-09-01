const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const {getProfile,updateProfile,deactivateProfile,addContactDetails,updateContactDetails} = require("./profile.controller");

router.get("/profile",checkToken,getProfile);
router.post("/contact",checkToken,addContactDetails);
router.patch("/profile",checkToken,updateProfile);
router.patch("/deactivate",checkToken,deactivateProfile);
router.patch("/contact",checkToken,updateContactDetails);
module.exports = router;