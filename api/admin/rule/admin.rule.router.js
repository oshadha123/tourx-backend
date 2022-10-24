const router = require("express").Router();

const { checkAdmin } = require("../../../auth/token_validation");
const {getAllRules,getAllRuleType,addRuleChanges,deleteRule} = require("./admin.rule.controller");

router.get("/rule/types",checkAdmin, getAllRuleType);
router.get("/rule/all",checkAdmin, getAllRules);
router.post("/rule/add",checkAdmin, addRuleChanges);
router.delete("/rule/:changeId",checkAdmin, deleteRule);
// router.get("/stats/payment",checkAdmin, getPaymentStats);

module.exports = router;