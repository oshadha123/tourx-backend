const router = require("express").Router();

const {getPaymentIntent} = require("./payment.controller");

// router.post("/login", login);
router.get("/payment/getSecret/:duration",getPaymentIntent);
// router.post("/informPayment");

module.exports = router;