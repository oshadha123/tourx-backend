const pool = require("../../config/database");

module.exports = {
    getProfileDetails: (table,userId,callBack) => {
        pool.query(
            "SELECT * FROM "+table+" WHERE userId=?",
            [userId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getContactDetails:(userId, roleId,results,callBack) =>{
        pool.query(
            "SELECT * FROM `usercontact` WHERE userId = ? AND roleId = ?",
            [userId,roleId],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    updateProfile:(query,userId,callBack)=>{
      pool.query(query,
        [userId],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
}