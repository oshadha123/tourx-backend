const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getUserStats} = require("./admin.stats.controller");

router.get("/stats/userRegistration",checkAdmin, getUserStats);

module.exports = router;