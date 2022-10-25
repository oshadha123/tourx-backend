const {
    getTravelModes
} = require("./travel.service");

module.exports = {
    getTravelModes:(req, res) =>{
        getTravelModes((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            return res.json({
                success: 1,
                data: result
            });
        })
    }
}