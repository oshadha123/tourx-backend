const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getUserStats,getPaymentStats,getCount,getAccountTypeStats,getNewReportedAccountCount,getTourCount} = require("./admin.stats.controller");

router.get("/stats/userRegistration",checkAdmin, getUserStats);
router.get("/stats/payment",checkAdmin, getPaymentStats);
router.get("/stats/user/count", getCount);
router.get("/stats/user/accountType", getAccountTypeStats);
router.get("/stats/user/reported", getNewReportedAccountCount);
router.get("/stats/tour", getTourCount);
module.exports = router;