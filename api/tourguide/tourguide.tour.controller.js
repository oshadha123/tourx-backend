const jwt = require("jsonwebtoken");

const {
    addTour,
    updateHidden,
    updateAttractionType,
    addAttractionPlace
  } = require("./tourguide.tour.service");

module.exports ={
    addTour:(req,res) => {
        let token = req.get("authorization");
        if (token === undefined){
            token = req.get("Authorization");
        }
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const guideId = decoded.userId
            const body = req.body;
            if(body.tourName === undefined || body.description === undefined || body.cost === undefined || body.days === undefined || body.nights === undefined || body.start === undefined || body.destination === undefined || body.attractionType === undefined || body.vrUrl === undefined || body.photoPath === undefined){
                return res.json({
                    success: 0,
                    data: "error, Incomplete data."
                });
            }
            if( body.hiddenPlace == 1){
                if(body.hiddenPath === undefined){
                    return res.json({
                        success: 0,
                        data: "error, Path data haven't received."
                    });
                }
            }
            const tourName = body.tourName;
            const description = body.description;
            const cost = body.cost;
            const days = body.days;
            const nights = body.nights;
            const start = body.start;
            const destination = body.destination;
            const hidden = body.hiddenPlace;
            const vrUrl = body.vrUrl
            const path = body.photoPath
            const attractionType = body.attractionType ; // this should be an array ex : [1,2,3,4,5]
            var attractionId = 0
            if(body.attractionId === undefined){
                addAttractionPlace(body.attractionName,body.longitude,body.latitude,body.villageId,(err,results)=>{
                    if (err) {
                        console.log(err);
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            data: "error, something went wrong."
                        });
                    }
                    attractionId = results[0].attractionId
                    addTour(guideId,tourName,description,cost,days,nights,start,destination,vrUrl,path,attractionId,(err,results)=>{
                        if (err) {
                            console.log(err);
                        }
                        if (!results) {
                            return res.json({
                                success: 0,
                                data: "error, something went wrong."
                            });
                        }
                        const tourId = results[0].tourId;
                        var data = [];
                        attractionType.forEach((x) => {
                            data.push([x,attractionId])
                        })
    
                        if(hidden){
                            updateHidden(tourId,body.hiddenPath,(err,results)=>{
                                if (err) {
                                    console.log(err);
                                }
                                if (!results) {
                                    return res.json({
                                        success: 0,
                                        data: "error, something went wrong."
                                    });
                                }
                                return res.json({
                                    success: 1,
                                    data: "success, New tour successfully added."
                                });
                            })
                        }else{
                            return res.json({
                                success: 1,
                                data: "success, New tour successfully added."
                            });
                        }
                    })
                })
            }else{
                attractionId=body.attractionId
                addTour(guideId,tourName,description,cost,days,nights,start,destination,vrUrl,path,attractionId,(err,results)=>{
                    if (err) {
                        console.log(err);
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            data: "error, something went wrong."
                        });
                    }
                    const tourId = results[0].tourId;
                    var data = [];
                    attractionType.forEach((x) => {
                        data.push([x,attractionId])
                    })

                    if(hidden){
                        updateHidden(tourId,body.hiddenPath,(err,results)=>{
                            if (err) {
                                console.log(err);
                            }
                            if (!results) {
                                return res.json({
                                    success: 0,
                                    data: "error, something went wrong."
                                });
                            }
                            return res.json({
                                success: 1,
                                data: "success, New tour successfully added."
                            });
                        })
                    }else{
                        return res.json({
                            success: 1,
                            data: "success, New tour successfully added."
                        });
                    }
                })
            }
        });
    }
}