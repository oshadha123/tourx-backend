const {
    getUserStats
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
    }
}