const router = require("express").Router();

const user = require("./user/admin.user.router");
const stats = require("./stats/admin.stats.router");
const rule = require("./rule/admin.rule.router");

router.use("/",user)
router.use("/",stats)
router.use("/",rule)

module.exports = router;