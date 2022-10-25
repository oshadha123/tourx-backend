const {
    checkIfReact,reactPost,removeReact
} = require("./tourist.react.service");

module.exports = {
    reactAPost:(req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const body = req.body;
            if(body.tourId === undefined){
                return res.json({
                    success: 0,
                    data: "error, Tour Id required."
                });
            }
            checkIfReact(userId,body.tourId,(err,results)=>{
                if (err){
                    console.log(err);
                }
                if (results){
                    return res.json({
                        success: 0,
                        data: "error, Already reacted to this post."
                    });
                }
                reactPost(userId,body.tourId,(err,results)=>{
                    if (err){
                        console.log(err);
                    }
                    if (!results){
                        return res.json({
                            success: 0,
                            data: "error, Something went wrong."
                        });
                    }
                    return res.json({
                        success: 1,
                        data: "success, Post reacted successfully."
                    });
                })
            })
        });
    },
    unReactPost:(req, res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const body = req.body;
            if(body.tourId === undefined){
                return res.json({
                    success: 0,
                    data: "error, Tour Id required."
                });
            }
            checkIfReact(userId,body.tourId,(err,results)=>{
                if (err){
                    console.log(err);
                }
                if (!results){
                    return res.json({
                        success: 0,
                        data: "error, User haven't reacted to this post."
                    });
                }
                reactPost(userId,body.tourId,(err,results)=>{
                    if (err){
                        console.log(err);
                    }
                    if (!results){
                        return res.json({
                            success: 0,
                            data: "error, Something went wrong."
                        });
                    }
                    return res.json({
                        success: 1,
                        data: "success, Post unreacted successfully."
                    });
                })
            })
        });
    }
}