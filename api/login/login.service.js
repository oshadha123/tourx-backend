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
    console.log(userId)
    var query ="";
    switch(roleId){
      case 1:
        query = "SELECT * FROM `admin` join usercontact on usercontact.userId=admin.userId WHERE admin.userId = ?";break;
      case 2:
        query = "SELECT * FROM tourguide join guidehasleaderboard on tourguide.userId=guidehasleaderboard.userId join usercontact on usercontact.userId=tourguide.userId WHERE tourguide.userId = ?";break;
      case 3:
        query = "SELECT * FROM `tourist` join usercontact on usercontact.userId=tourist.userId WHERE tourist.userId = ?";break;
      default:
        return
    }
    pool.query(
      query,
      [userId],
      (error, results, fields) => {
        console.log(error);
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
