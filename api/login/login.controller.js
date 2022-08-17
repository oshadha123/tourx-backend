const {
  searchDbForEmailPassword,
  getUserDetails
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
            const jsontoken = sign({ result: results },process.env.JWT_KEY, {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              firstName :results.firstName,
              lastName :results.lastName,
              profile:results.profilePicture,
              userId:results.userId,
              profilePicture : results.profilePicture,
              points:results.points,
              contact:results.contactNumber,
              role : userRole,
              verified : verified,
              token: jsontoken
            });
        });
      });
    }
  };