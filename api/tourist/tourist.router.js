const router = require("express").Router();

const tour = require("./tour/tourist.tour.router");
const favouriteType = require("./favouriteType/tourist.favouriteType.router");
const tourguide = require("./tourGuide/tourist.tourGuide.router");
const attractionPlace = require("./attractionPlace/tourist.attractionPlace.router");

router.use("/",tour)
router.use("/",favouriteType)
router.use("/",tourguide)
router.use("/",attractionPlace)

module.exports = router;