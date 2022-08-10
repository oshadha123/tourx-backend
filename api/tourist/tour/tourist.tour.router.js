const router = require("express").Router();

const {getTours,getToursByLocation} = require("./tourist.tour.controller");


//router.post("/", register);
router.get("/tour", getTours);
router.get("/tour/:location", getToursByLocation);

module.exports = router;