const pool = require("../../config/database");

module.exports = {
    getTravelModes:(callBack) => {
        pool.query(
            "SELECT * FROM modeoftransport ORDER BY travelMode ASC;",
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}