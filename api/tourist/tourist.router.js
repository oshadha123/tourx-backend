const router = require("express").Router();

const tour = require("./tour/tourist.tour.router");
router.use("/",tour)
module.exports = router;