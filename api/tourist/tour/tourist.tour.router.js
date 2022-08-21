const router = require("express").Router();

const { checkTourist } = require("../../../auth/token_validation");
const {getTours,getToursByLocation} = require("./tourist.tour.controller");


//router.post("/", register);
router.get("/tour",checkTourist, getTours);
router.get("/tour/:location",checkTourist, getToursByLocation);

module.exports = router;