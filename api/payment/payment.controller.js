const stripe  = require("stripe")('sk_test_51Lh5NdDNSXG74cF2NWgIPmiXs5krTfTL8ru0KzJu3SngOH6k6k85xIFrBVH5j9ZeC4jGedb90nrgPzgzE2wzv6SG00KvJXFspa');

const {
    getLatestPackagePrice
} = require("./payment.service");

async function createIntent(amount,callBack) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
    },);
    return callBack(null,paymentIntent);
}

async function statusOfPayment(customerIntent){

}

module.exports = {
    getPaymentIntent:(req,res)=>{
        const duration = req.params.duration;
        getLatestPackagePrice((err, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            const packarePrice = results.value;
            createIntent(duration*packarePrice,(error,paymentIntent)=>{
                const clientSecret = paymentIntent.client_secret
                return res.json({
                    success: 1,
                    data: {"secret":clientSecret}
                });
            });
        });
    },
    validatePayment:(req,res)=>{
        if (req.body.paymentIntent === undefined || req.body.paymentState === undefined){
            return res.json({
                success: 0,
                data: "Unable to trieve data"
            });
        }
        const paymentIntent = req.body.paymentIntent;
        const paymentState = req.body.paymentState;

    }
}