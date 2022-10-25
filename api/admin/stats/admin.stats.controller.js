const {
    getUserStats,
    countUsers,
    countAccountType,
    countReportedAccount,
} = require("./admin.stats.service");

module.exports = {
    getUserStats: (req, res) => {
        var output = {'tourist':[],'tourguide':[]}
        getUserStats((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            } 
            result.forEach((element, i) => {
                result[i].date = element.date.toDateString();
                if(result[i].userType=="tourist"){
                    output.tourist.push(result[i])
                }else{
                    output.tourguide.push(result[i])
                }
            });
            return res.json({
                success: 1,
                data: output
            });
        })
    },
    getPaymentStats: (req, res) => {
        var output={"premium": [
            {
                "date": "Tue Aug 09 2022",
                "count": 1
            },
            {
                "date": "Thu Aug 11 2022",
                "count": 1
            },
            {
                "date": "Mon Aug 15 2022",
                "count": 1
            },
            {
                "date": "Wed Aug 17 2022",
                "count": 1
            },
            {
                "date": "Sat Aug 20 2022",
                "count": 2
            }
        ]}
        return res.json({
            success: 1,
            data: output
        });
    },
    getCount:(req, res) => {
        countUsers((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            } 
            const verified = result[0][0].verified;
            const unverified = result[1][0].unverified;
            const deactivated = result[2][0].deactivated;

            return res.json({
                success: 1,
                data: {
                    "verified":verified,
                    "unverified":unverified,
                    "deactivated":deactivated
                }
            });
        });
    },
    getAccountTypeStats:(req, res) => {
        countAccountType((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }

            const value1 = result[0].count
            const value2 = result[1].count 
            return res.json({
                success: 1,
                data: {
                    "NonePremium":value1,
                    "Premium":value2
                }
            });
        })
    },
    getNewReportedAccountCount:(req, res) => {
        countReportedAccount((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }

            const count = result[0].count
            return res.json({
                success: 1,
                data: {
                    "count":count
                }
            });
        });
    }
}