const jwt = require("jsonwebtoken");

const {
    getAllTour,approveTour,rejectTour
  } = require("./admin.tour.service");

module.exports = {
    getAlltour:(req,res) => {
        getAllTour((err,results)=>{
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
                data: results
            });
        })
    },
    approveTour:(req,res) =>{
        const tourId = req.params.tourId;
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const adminId = decoded.userId
            approveTour(tourId,adminId,(err,results)=>{
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
                    data: "success, Tour approved successfully."
                });
            });
        });
    },
    rejectTour:(req,res) => {
        const tourId = req.params.tourId;
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const adminId = decoded.userId
            rejectTour(tourId,adminId,(err,results)=>{
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
                    data: "success, Tour approved successfully."
                });
            });
        });
    }
}