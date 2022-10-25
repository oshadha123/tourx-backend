const router = require("express").Router();
const { checkTourGuide } = require("../../auth/token_validation");
const {
    addTour
} = require("./tourguide.tour.controller");

router.post("/tour/add", checkTourGuide, addTour);
// router.delete("/", checkTourGuide, deleteUser);

module.exports = router;