const pool = require("../../../config/database");

module.exports = {
    getAllTour:(callBack) => {
        pool.query(
            "SELECT * FROM `tour` WHERE tour.approvalStatus = 'n'",
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    approveTour:(tourId,callBack) => {
        pool.query(
            "UPDATE `tour` SET tour.approvalStatus = 'y', tour.approvedTimestamp= CURRENT_TIMESTAMP WHERE tour.tourId = ?",
            [tourId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    rejectTour:(tourId,callBack) => {
        pool.query(
            "UPDATE `tour` SET tour.approvalStatus = 'r' , tour.approvedTimestamp= CURRENT_TIMESTAMP WHERE tour.tourId = ?",
            [tourId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
