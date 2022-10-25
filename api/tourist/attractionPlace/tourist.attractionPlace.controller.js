const jwt = require("jsonwebtoken");
const {
    getAllAttraction,getPhoto
} = require("./tourist.attractionPlace.service");


module.exports = {
    getAllAttraction: (req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        //console.log(req)
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            getAllAttraction(userId, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                }
                var itemsProcessed = {count:1};
                results.forEach((item, index, results) => {
                    // console.log(item)
                    getPhoto(item.attractionId, results, itemsProcessed, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!result) {
                            return res.json({
                                success: 0,
                                data: "error, something went wrong."
                            });
                        }
                        console.log(result[0])
                        if(result[0].path !== undefined){
                            results[index].coverPhoto = result[0].path
                        }
                
                    },(err, results) => {
                        return res.json({
                            success: 1,data:results})
                    });
                });
            });
        })
    }
}