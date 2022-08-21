const {
  searchDbForEmailPassword,
  getUserDetails,
  getUserContact
  } = require("./login.service");

const crypto = require("crypto");
const { sign } = require("jsonwebtoken");
  
  module.exports = {
    login: (req, res) => {
      const body = req.body;
      body.email = crypto.createHash('md5').update(body.email.toLowerCase()).digest('hex');
      body.password = crypto.createHash('md5').update(body.password).digest('hex');

      searchDbForEmailPassword(body.email, body.password,  (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        } 
        const userRole = results.roleId;
        const verified = results.verificationStatus;
        getUserDetails(results.userId, userRole, (err,results) => {
            getUserContact(results.userId, userRole,results,(err,result) => {
              if (err) {
                console.log(err);
              }
              if (!result) {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
              const jsontoken = sign({ userId: results.userId, role : userRole },process.env.JWT_KEY, {
                expiresIn: "1h"
              });
              if (Object.keys(result).length === 0) {
                return res.json({
                  success: 1,
                  message: "login successfully",
                  firstName :results.firstName,
                  lastName :results.lastName,
                  userId:results.userId,
                  profilePicture : results.profilePicture,
                  points:results.points,
                  role : userRole,
                  verified : verified,
                  token: jsontoken
                });
              }else{
                return res.json({
                  success: 1,
                  message: "login successfully",
                  firstName :results.firstName,
                  lastName :results.lastName,
                  userId:results.userId,
                  profilePicture : results.profilePicture,
                  points:results.points,
                  contact: result[0].contactNumber,
                  role : userRole,
                  verified : verified,
                  token: jsontoken
                });
              }

            })
        });
      });
    }
  };