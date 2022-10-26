const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getAlltour,approveTour,rejectTour} = require("./admin.tour.controller");

router.get("/tour/all",checkAdmin, getAlltour);
router.patch("/tour/approve/:tourId",checkAdmin, approveTour);
router.patch("/tour/reject/:tourId",checkAdmin, rejectTour);

// router.get("/user/tourist/ordered/:field",checkAdmin, getAlltouristFiltered);
// router.get("/user/tourist/ordered/:field/:way",checkAdmin, getAlltouristFiltered);
// router.get("/user/tourguide",checkAdmin, getAlltourGuide);
// router.get("/user/tourguide/ordered/:field",checkAdmin, getAlltourGuideFiltered);
// router.get("/user/tourguide/ordered/:field/:way",checkAdmin, getAlltourGuideFiltered);

module.exports = router;