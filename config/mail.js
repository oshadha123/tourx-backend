const nodemailer = require('nodemailer')

const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "tourxproject@gmail.com",
        pass: "shkvvxiwgmqnvsbw"
    }
});

// client.sendMail(
//     {
//         from: "sender",
//         to: "recipient",
//         subject: "Sending it from Heroku",
//         text: "Hey, I'm being sent from the cloud"
//     },(err, info) => {
//         return res.json({
//             success: 0,
//             data: "Invalid email or password"
//           });
//     }
// )

module.exports = client