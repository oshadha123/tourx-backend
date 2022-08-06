const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
 
  getLeaderboard,
  getYourTours
 
} = require("./tourguide.home.controller");

router.get("/leaderboard", checkToken, getLeaderboard);
router.post("/yourtours", getYourTours);



module.exports = router;
