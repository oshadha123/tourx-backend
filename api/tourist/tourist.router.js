const router = require("express").Router();

const tour = require("./tour/tourist.tour.router");
const favouriteType = require("./favouriteType/tourist.favouriteType.router");

router.use("/",tour)
router.use("/",favouriteType)

module.exports = router;