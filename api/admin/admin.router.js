const router = require("express").Router();

const user = require("./user/admin.user.router");
const stats = require("./stats/admin.stats.router");
const rule = require("./rule/admin.rule.router");
const tour = require("./tour/admin.tour.router");
const report = require("./report/admin.report.router");

router.use("/",user)
router.use("/",stats)
router.use("/",rule)
router.use("/",tour)
router.use("/",report)

module.exports = router;