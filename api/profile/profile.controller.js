const jwt = require("jsonwebtoken");

const {
    getProfileDetails,getContactDetails,updateProfile
} = require("./profile.service");

module.exports = {
    getProfile: (req, res) => {
        let token = req.get("authorization");
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
    updateProfile: (req, res) => {
        let token = req.get("authorization");
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
    }
}