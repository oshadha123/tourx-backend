const {
    getAllRuleTypes,getRuleChanges
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
    })
}