const pool = require("../../config/database");

module.exports = {
    getTours:(callBack)=>{
        pool.query(
            "SELECT userId FROM `login` WHERE hashEmail= ?",
            [email],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
          );
    }
}