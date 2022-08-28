const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getAlltourist,getAlltourGuideFiltered,getAlltouristFiltered} = require("./admin.user.controller");

router.get("/user/tourist",checkAdmin, getAlltourist);
router.get("/user/tourist/ordered/:field",checkAdmin, getAlltouristFiltered);
router.get("/user/tourist/ordered/:field/:way",checkAdmin, getAlltouristFiltered);
router.get("/user/tourguide/ordered/:field/:way",checkAdmin, getAlltourGuideFiltered);

module.exports = router;