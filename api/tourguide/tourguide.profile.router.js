const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
 
  getLeaderboard
 
} = require("./tourguide.profile.controller");

router.get("/leaderboard", checkToken, getLeaderboard);


module.exports = router;
