const pool = require("../../../config/database");

module.exports = {
    getAllTour:(callBack) => {
        pool.query(
            "SELECT tour.*, city.cityName, touristattraction.attractionId,touristattraction.attractionName,photo.path FROM tour,city,touristattraction,photo WHERE tour.approvalStatus = 'n' AND tour.tourId=photo.tourId AND photo.attractionId= touristattraction.attractionId AND tour.start=city.cityName;",
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    approveTour:(tourId,adminId,callBack) => {
        pool.query(
            "UPDATE `tour` SET tour.approvalStatus = 'y', tour.approvedTimestamp= CURRENT_TIMESTAMP,adminId=? WHERE tour.tourId = ?",
            [adminId,tourId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    rejectTour:(tourId,adminId,callBack) => {
        pool.query(
            "UPDATE `tour` SET tour.approvalStatus = 'r' , tour.approvedTimestamp= CURRENT_TIMESTAMP,adminId=? WHERE tour.tourId = ?",
            [adminId,tourId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
