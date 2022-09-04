const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getAllRules,getAllRuleType} = require("./admin.rule.controller");

router.get("/rule/types",checkAdmin, getAllRuleType);
router.get("/rule/all",checkAdmin, getAllRules);
// router.get("/stats/payment",checkAdmin, getPaymentStats);

module.exports = router;