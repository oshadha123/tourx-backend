const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getUserStats,getPaymentStats} = require("./admin.stats.controller");

router.get("/stats/userRegistration", getUserStats);
router.get("/stats/payment",checkAdmin, getPaymentStats);

module.exports = router;