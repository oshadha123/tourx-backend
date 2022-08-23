const jwt = require("jsonwebtoken");

module.exports = {
    getAllAttraction: (req, res) => {
        let token = req.get("authorization");
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            
        })
    }
}