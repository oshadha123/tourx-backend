const router = require("express").Router();

const { checkTourist } = require("../../../auth/token_validation");
const {getTours,getToursByLocation,getToursByAttraction} = require("./tourist.tour.controller");


//router.post("/", register);
router.get("/tour",checkTourist, getTours);
// router.post("/tour",checkTourist, getTours);
// router.get("/tour/:location",checkTourist, getToursByLocation);
router.get("/tour/attraction/guide/:attractionId", getToursByAttraction);

module.exports = router;