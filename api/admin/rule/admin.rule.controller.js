const jwt = require("jsonwebtoken");

const {
    getAllRuleTypes,getRuleChanges,addRule,getRuleChangeById,deleteRule
} = require("./admin.rule.service");

module.exports = {
    getAllRules: ((req, res) => {
        getRuleChanges((err, result)=>{
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    data: "error, something went wrong."
                });
            }
            result.forEach((element, i) => {
                result[i].localAddedTime = element.addedTime.toLocaleString();
                result[i].localEnd = element.end.toLocaleString();
                result[i].localStart = element.start.toLocaleString();
            });
            return res.json({
                success: 1,
                data: result
            });
        })
    }),
    getAllRuleType:((req, res) => {
        getAllRuleTypes((err, result)=>{
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
    }),
    deleteRule:((req, res) => {
        let token = req.get("authorization");
        token = token.slice(7);
        const changeId = req.params.changeId;
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const body = req.body
            getRuleChangeById(changeId,(err, result)=>{
                if (err) {
                    console.log(err);
                }
                if (!result) {
                    return res.json({
                        success: 0,
                        data: "error, something went wrong."
                    });
                } 
                if(userId != result.adminId){
                    return res.json({
                        success: 0,
                        data: "error, This user haven't permission to delete this record."
                    });
                }
                deleteRule(changeId,(err, result)=>{
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
                        data: "Success, Rule record successfully deleted."
                    });
                })
            })
        })
    }),
    addRuleChanges:((req, res) => {
        let token = req.get("authorization");
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            const userId = decoded.userId
            const body = req.body
            if(!body.start || !body.end || !body.value || !body.ruleId){
                return res.json({
                    success: 0,
                    data: "error, Incomplete data."
                });
            }
            addRule(body.start,body.end,body.value,body.ruleId,userId,(err, result)=>{ //start,end,value,ruleId
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
                    data: "Success, Rule value successfully added."
                });
            })
        })
    })
}