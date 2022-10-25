const router = require("express").Router();

const {getTravelModes} = require("./travel.controller");

router.get("/travel/mode/", getTravelModes);

module.exports = router;