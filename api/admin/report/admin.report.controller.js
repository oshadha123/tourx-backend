const {
    getReportedUsers,getUserReportedById, addContactToBannedList,freeUser
} = require("./admin.report.service");

module.exports = {
    getAllReportedUsers:(req,res) => {
        getReportedUsers((err,results)=>{
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            return res.json({
                success: 1,
                data:results[1]
            });
        })
    },
    getReportedUserById:(req,res) => {
        const userId = req.params.userId;
        getUserReportedById(userId,(err,results)=>{
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            var output = []
            results.forEach((element, i) => {
                results[i].reportedDate = element.reportedDate.toDateString();
                output.push(results[i])
            });
            return res.json({
                success: 1,
                data:output
            });
        })
    },
    bannedAUser:(req,res) => {
        const body = req.body;
        if(body.userId===undefined){
            return res.json({
                success: 0,
                data: "error, User Id required."
            });
        }
        addContactToBannedList(body.userId,(err,results)=>{
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            return res.json({
                success: 1,
                data: "Success, User account banned successfully."
            });
        });
    },
    releaseUser:(req,res) => {
        const body = req.body;
        if(body.userId===undefined){
            return res.json({
                success: 0,
                data: "error, User Id required."
            });
        }
        freeUser(body.userId,(err,results)=>{
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            return res.json({
                success: 1,
                data: "Success, User account released successfully."
            });
        });
    }
}