const {
    getAlltourist,getAlltourGuideFiltered,getAlltouristFilterBy
} = require("./admin.user.service");

module.exports = {
    getAlltourist: (req, res) => {
        getAlltourist((err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            results.forEach((element,i) => {
                results[i].createdDate= element.createdDate.toDateString();
            });
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    getAlltouristFiltered : (req, res) =>{
        var field = req.params.field;
        const way = req.params.way.toUpperCase();
        if (!way){
            way ="ASC"
        }
        switch(field.toLowerCase()){
            case "firstname":
                field="firstName";
                if(way != "ASC" && way != "DESC"){
                    return res.json({
                        success: 0,
                        data: "Error, Incorrect order method."
                    });
                }
                break;
            case "lastname":
                field="lastName";
                if(way != "ASC" && way != "DESC"){
                    return res.json({
                        success: 0,
                        data: "Error, Incorrect order method."
                    });
                }
                break;
            case "createddate":
                field="createdDate";
                if(way != "ASC" && way != "DESC"){
                    return res.json({
                        success: 0,
                        data: "Error, Incorrect order method."
                    });
                }
                break;
            case "createdtime":
                field="createdTime";
                if(way != "ASC" && way != "DESC"){
                    return res.json({
                        success: 0,
                        data: "Error, Incorrect order method."
                    });
                }
                break;
            default:
                return res.json({
                    success: 0,
                    data: "Error, Incorrect data field."
                });
        }
        getAlltouristFilterBy(field,way,(err, results)=>{
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            results.forEach((element,i) => {
                results[i].createdDate= element.createdDate.toDateString();
            });
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAlltourGuideFiltered : (req, res) =>{
    
    }
}