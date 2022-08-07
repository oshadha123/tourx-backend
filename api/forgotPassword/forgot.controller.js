const { mailHash,decrypt } = require("../../config/encryption");
const client = require("../../config/mail");

const {
    getEmail,
    addRecord,
    getOtp,
    updateValidity,
    searchEmail
} = require("./forgot.service");

module.exports = {
    resetPasswordWithoutLogin: (req, res) => {
        const body = req.body;
        const hashEmail = mailHash(body.email);
        searchEmail(hashEmail, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, unable to find the email address."
                });
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            addRecord(hashEmail, otp, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (! results) {
                    return res.json({
                        success: 0,
                        data: "error, Something went wrong."
                    });
                }
                client.sendMail({
                    from: 'tourxproject@gmail.com',
                    to: body.email,
                    subject: 'Password Reset Code',
                    text: 'Use this otp to reset your password:'+otp
                })
                return res.json({
                    success: 1,
                    data: "Password reset otp sent successfully."
                });
            });
        });
    },
    resetPassword: (req, res) => {
        const body = req.body;

    },
    checkValidity: (req, res) => {

    }
}