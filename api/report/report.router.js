const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const {reportUser} = require("./report.controller");

router.post("/report/user/",checkToken, reportUser);

module.exports = router;