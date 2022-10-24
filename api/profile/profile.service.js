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
    },
    addContact:(userId,roleId,contact,callBack)=>{
      pool.query(
        "INSERT INTO usercontact VALUES (?,?,?)",
        [userId,roleId,contact],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    updateContact:(userId,roleId,contact,callBack)=>{
      pool.query(
        "UPDATE usercontact SET contactNumber=? WHERE userId=? AND roleId=?;",
        [contact,userId,roleId],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    deactivateProfile:(userId,roleId,callBack)=>{
      pool.query(
        "UPDATE login SET login.accountState=0 WHERE login.userId=? AND login.roleId=?;",
        [userId,roleId],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    checkBanned:(telephoneNum) => {
      telephoneNum = telephoneNum.split("-").slice(0,).join("");
      const omittedZero = telephoneNum.split(1);
      pool.query(
        "SELECT * FROM banned_telephone_numbers WHERE telephoneNumbers=? OR telephoneNumbers=?",
        [telephoneNum,omittedZero],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    checkAvailability:(telephoneNum)=>{
      telephoneNum = telephoneNum.split("-").slice(0,).join("");
      pool.query(
        "SELECT * FROM usercontact WHERE usercontact.contactNumber=?",
        [telephoneNum],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
}