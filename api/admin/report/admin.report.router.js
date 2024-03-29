const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getAllReportedUsers,getReportedUserById,bannedAUser,releaseUser} = require("./admin.report.controller");

router.get("/user/reported/all",checkAdmin, getAllReportedUsers);
router.get("/user/reported/:userId",checkAdmin, getReportedUserById);
router.post("/user/banned",checkAdmin, bannedAUser);
router.post("/user/free",checkAdmin, releaseUser);
// router.get("/user/tourguide",checkAdmin, getAlltourGuide);
// router.get("/user/tourguide/ordered/:field",checkAdmin, getAlltourGuideFiltered);
// router.get("/user/tourguide/ordered/:field/:way",checkAdmin, getAlltourGuideFiltered);

module.exports = router;