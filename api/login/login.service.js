const pool = require("../../config/database");

module.exports = {
  searchDbForEmailPassword: (email , password, callBack) => {
    pool.query(
      "SELECT userId,roleId,verificationStatus  FROM `login` WHERE hashEmail= ? AND `password`= ?",
      [email,password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserDetails: (userId , roleId, callBack) => {
    var query ="";
    switch(roleId){
      case 1:
        query = "SELECT * FROM `admin` WHERE userId = ?";break;
      case 3:
        query = "SELECT * FROM `tourist` WHERE userId = ?";break;
      case 2:
        query = "SELECT * FROM `tourguide` WHERE userId = ?";break;
      default:
        return
    }
    pool.query(
      query,
      [userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
