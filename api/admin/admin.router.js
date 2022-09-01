const router = require("express").Router();

const user = require("./user/admin.user.router");
const stats = require("./stats/admin.stats.router");

router.use("/",user)
router.use("/",stats)

module.exports = router;