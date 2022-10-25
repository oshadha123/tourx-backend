const router = require("express").Router();

const { checkTourist } = require("../../../auth/token_validation");
const {getAllAttraction} = require("./tourist.attractionPlace.controller");

router.get("/attraction",checkTourist, getAllAttraction);
// router.get("/attraction/:location",checkTourist, getAttractionByLocation);

module.exports = router;