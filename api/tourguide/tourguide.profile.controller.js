const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./tourguide.profile.service");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    
    getLeaderboard: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    }
  };
  