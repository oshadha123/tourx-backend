const router = require("express").Router();

const { checkTourist } = require("../../../auth/token_validation");
// const {getTours,getToursByLocation} = require("./tourist.tour.controller");

router.get("/attraction", getAllAttraction);
router.get("/attraction/:location",checkTourist, getAttractionByLocation);

module.exports = router;