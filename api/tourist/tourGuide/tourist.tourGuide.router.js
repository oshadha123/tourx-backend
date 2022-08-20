const router = require("express").Router();

// const { getTourGuide } = require("../../../auth/token_validation");
const {getTourGuide} = require("./tourist.tourGuide.controller");


// //router.post("/", register);
// router.get("/tour",checkTourist, getTours);
router.get("/tourguide", getTourGuide);

module.exports = router;