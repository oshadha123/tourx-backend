const { mailHash,decrypt,hash } = require("../../config/encryption");
const client = require("../../config/mail");

const {
    getEmail,
    addRecord,
    getOtp,
    updateValidity,
    searchEmail,
    updatePassword,
    checkPassword
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
        const userId = body.userId;
        const roleId = body.roleId;
        var oldPassword =  body.oldPassword.toString();
        var newPassword = body.newPassword.toString();
        checkPassword(userId,roleId,oldPassword,(err, results)=>{
            if (err) {
                console.log(err);
            } 
            if (! results) {
                return res.json({
                    success: 0,
                    data: "error, Old password is wrong."
                });
            }
            newPassword = hash(newPassword);
            updatePassword(userId,roleId,newPassword,(err, results) => {
                if (err) {
                    console.log(err);
                }
                if (! results.changedRows) {
                    return res.json({
                        success: 0,
                        data: "error, Something went wrong."
                    });
                }
                return res.json({
                    success: 1,
                    data: "Password reset successfully."
                });
            });
        });
    },
    changePassword: (req, res) => {
        const body = req.body;
        const otp = body.otp;
        var newPassword = body.newPassword;
        const email = body.email;
        const hashedEmail = mailHash(email);
        getOtp(hashedEmail, otp, (err, results) =>{
            if (err) {
                console.log(err);
            }
            if (! results) {
                return res.json({
                    success: 0,
                    data: "error, Something went wrong."
                });
            }
            const recordId = results.recordId;
            searchEmail(hashedEmail, (err, results) =>{
                if (err) {
                    console.log(err);
                }
                if (! results) {
                    return res.json({
                        success: 0,
                        data: "error, Something went wrong."
                    });
                }
                newPassword = hash(newPassword);
                updatePassword(results.userId,results.roleId,newPassword,(err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(results)
                    if (! results.changedRows) {
                        return res.json({
                            success: 0,
                            data: "error, Something went wrong."
                        });
                    }
                    client.sendMail({
                        from: 'tourxproject@gmail.com',
                        to: email,
                        subject: 'Password Reset Confirmation',
                        text: 'The password has been reset successfully.'
                    })
                    updateValidity(recordId);
                    return res.json({
                        success: 1,
                        data: "Password reset successfully."
                    });
                });
            });
        });
    }
}