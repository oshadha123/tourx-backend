const jwt = require("jsonwebtoken");

const {
    getProfileDetails,getContactDetails,updateProfile,deactivateProfile,addContact,updateContact,checkBanned
} = require("./profile.service");

module.exports = {
    getProfile: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const roleId = decoded.role
            var table = ""
            switch (roleId){
                case 1:
                    table = "admin";break;
                case 2:
                    table = "tourguide";break;
                case 3:
                    table = "tourist";break;
                case 4:
                    table = "moderator";break;
                default:
                    return res.json({
                        success: 0,
                        data: "Error, Unsupported user type."
                    });
                    break;
            }
            getProfileDetails(table,userId,(err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                getContactDetails(userId,roleId,results,(err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (!result) {
                        return res.json({
                            success: 0,
                            data: "error, something went wrong."
                        });
                    }
                    results[0].contact = []
                    if (result.length > 0){
                        results[0].contact = result[0].contactNumber
                    }
                    return res.json({
                        success: 1,
                        data: results
                    });
                });
            });
        });
    },
    deactivateProfile:(req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const roleId = decoded.role
            if(roleId==1){
                return res.json({
                    success: 0,
                    data: "Error,Unsupported account type."
                });
            }
            deactivateProfile(userId,roleId,(err, result) => {
                if (err) {
                    console.log(err);
                }
                if (!result) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                return res.json({
                    success: 1,
                    data: "Success,Profile successfully deactivated."
                });
            })
        });
    },
    updateProfile: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const roleId = decoded.role
            const body = req.body
            if(!body.change){
                return res.json({
                    success: 0,
                    data: "Error,Empty data set received."
                });
            }
            var receivedList = Object.keys(body.change);
            var table = ""
            if(roleId==1){
                table = "admin"
            }else if(roleId==2){
                table = "tourguide"
            }else if(roleId==3){
                table = "tourist"
            }else{
                table = "moderator"
            }
            var query = "UPDATE "+table+" SET "
            var count = 1
            const length = receivedList.length;
            receivedList.forEach(element => {
                console.log(element)
                query += " "+element+"="+"'"+body.change[element]+"'"
                if(count != length){
                    query +=","
                }
                count++;
            });
            query += " WHERE userId=?";
            updateProfile(query,userId,(err, result) => {
                if (err) {
                    console.log(err);
                }
                if (!result) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                return res.json({
                    success: 1,
                    data: "Success, Data successfully updated."
                }); 
            });
        });
    },
    addContactDetails: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const roleId = decoded.role
            const body = req.body
            if(!body.contact){
                return res.json({
                    success: 0,
                    data: "Error,Empty data set received."
                });
            }
            if(body.contact.length==0){
                return res.json({
                    success: 0,
                    data: "Error,Empty data set received."
                });
            }
            if(body.contact[0].length!=10){
                return res.json({
                    success: 0,
                    data: "Error,Invalid telephone number length."
                });
            }
            checkBanned(body.contact[0],(err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    return res.json({
                        success: 0,
                        data: "error, Banned telephone number."
                    });
                }
                checkAvailability(body.contact[0],(err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        return res.json({
                            success: 0,
                            data: "error, Telephone number already in use."
                        });
                    }
                    getContactDetails(userId,roleId,null,(err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!result) {
                            return res.json({
                                success: 0,
                                data: "error, something went wrong."
                            });
                        }
                        if(result.length>0){
                            return res.json({
                                success: 0,
                                data: "error, Try to update existing number."
                            });
                        }

                        addContact(userId,roleId,body.contact[0],(err, result)=>{
                            if (err) {
                                console.log(err);
                            }
                            if (!result) {
                                return res.json({
                                    success: 0,
                                    data: "error, something went wrong."
                                });
                            }
                            return res.json({
                                success: 1,
                                data: "Success, Contact details successfully added."
                            });
                        });
                    });
                });
            })
        })
    },
    updateContactDetails: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const roleId = decoded.role
            const body = req.body
            if(!body.contact){
                return res.json({
                    success: 0,
                    data: "Error,Empty data set received."
                });
            }
            if(body.contact.length==0){
                return res.json({
                    success: 0,
                    data: "Error,Empty data set received."
                });
            }
            if(body.contact[0].length!=10){
                return res.json({
                    success: 0,
                    data: "Error,Invalid telephone number length."
                });
            }
            checkBanned(body.contact[0],(err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    return res.json({
                        success: 0,
                        data: "error, Banned telephone number."
                    });
                }
                checkAvailability(body.contact[0],(err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        return res.json({
                            success: 0,
                            data: "error, Telephone number already in use."
                        });
                    }
                    getContactDetails(userId,roleId,null,(err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!result) {
                            return res.json({
                                success: 0,
                                data: "error, something went wrong."
                            });
                        }
                        if(result.length==0){
                            return res.json({
                                success: 0,
                                data: "error, Unable to find existing data.Please add contact details."
                            });
                        }
                        updateContact(userId,roleId,body.contact[0],(err, result)=>{
                            if (err) {
                                console.log(err);
                            }
                            if (!result) {
                                return res.json({
                                    success: 0,
                                    data: "error, something went wrong."
                                });
                            }
                            return res.json({
                                success: 1,
                                data: "Success, Contact details successfully updated."
                            });
                        });
                    })
                });
            });
        })
    }
}