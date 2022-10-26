const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
// const {} = require("./admin.tour.controller");

// router.get("/user/tourist",checkAdmin, getAlltourist);
// router.get("/user/tourist/ordered/:field",checkAdmin, getAlltouristFiltered);
// router.get("/user/tourist/ordered/:field/:way",checkAdmin, getAlltouristFiltered);
// router.get("/user/tourguide",checkAdmin, getAlltourGuide);
// router.get("/user/tourguide/ordered/:field",checkAdmin, getAlltourGuideFiltered);
// router.get("/user/tourguide/ordered/:field/:way",checkAdmin, getAlltourGuideFiltered);

module.exports = router;