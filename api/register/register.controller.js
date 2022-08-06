const client = require("../../config/mail");
const encrypt = require("../../config/encryption");

const {
    checkExistenceOfEmail,
    addNewUser,
    updateLoginDetails,
    saveOtp,
    getVerificationOTP,
    updateVerificationStatus
} = require("./register.service");

module.exports = {
    signUp: (req, res) => {
        const body = req.body;
        const hashEmail = encrypt.mailHash(body.email);
        checkExistenceOfEmail(hashEmail, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                return res.json({
                    success: 0,
                    data: "error, email already exists."
                });
            }
            addNewUser(body.firstName, body.lastName, body.profilePic, body.roleId, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (! results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong when user registration."
                    });
                }
                const userId = results.userId
                const encryptedMail = encrypt.encrypt(body.email)
                const password = encrypt.hash(body.password)
                updateLoginDetails(userId,body.roleId,encryptedMail,hashEmail,password,0,(err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    if (! results) {
                        return res.json({
                            success: 0,
                            data: "error, something went wrong when updating login data."
                        });
                    }
                    const otp = Math.floor(100000 + Math.random() * 900000).toString();
                    saveOtp(userId,body.roleId,otp,(err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        if (! results) {
                            return res.json({
                                success: 0,
                                data: "error, something went wrong when updating login data."
                            });
                        }
                        return res.json({
                            success: 1,
                            data: "Success. New user successfully registered."
                        });
                    });
                    client.sendMail({
                        from: 'tourxproject@gmail.com',
                        to: body.email,
                        subject: 'Email Verification Code',
                        text: 'Use this otp to verify your account:'+otp
                    })
                });
            });
        });
    },
    verify:(req, res) => {
        const body = req.body;
        getVerificationOTP(body.userId,body.roleId,body.otp,(err, results) => {
            if (err) {
                console.log(err);
            }
            if (! results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong. Check the inputs again."
                });
            }
            console.log(results)
            updateVerificationStatus(body.userId,body.roleId,(err, results) => {
                if (err) {
                    console.log(err);
                }
                if (! results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                console.log(results)
                return res.json({
                    success: 1,
                    data: "Success. User Successfully Verified."
                });
            });
        });
    }
};