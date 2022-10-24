const router = require("express").Router();

const {getPaymentIntent,validatePayment} = require("./payment.controller");

// router.post("/login", login);
router.get("/payment/getSecret/:duration",getPaymentIntent);
router.post("/informPayment",validatePayment);

module.exports = router;