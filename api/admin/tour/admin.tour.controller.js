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
        approveTour(tourId,(err,results)=>{
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
    },
    rejectTour:(req,res) => {
        const tourId = req.params.tourId;
        rejectTour(tourId,(err,results)=>{
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
    }
}