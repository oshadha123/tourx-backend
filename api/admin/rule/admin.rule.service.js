const pool = require("../../../config/database");

module.exports = {
    getAllRuleTypes: (callBack) => {
        pool.query(
            "SELECT * FROM `businessrule`",
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRuleChanges: (callBack) => {
        pool.query(
            "SELECT rulehandle.changeId,rulehandle.timeStamp AS 'addedTime',rulehandle.endDateTime AS `end`, rulehandle.startDateTime AS `start`,rulehandle.value,rulehandle.adminId, admin.firstName,admin.lastName,businessrule.ruleId,businessrule.ruleName FROM rulehandle,businessrule,admin WHERE rulehandle.ruleId=businessrule.ruleId AND rulehandle.adminId=admin.userId",
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    filterChangesByRule: (ruleId, callBack) => {

    },
    addRule:(start,end,value,ruleId,adminId,callBack) =>{
        pool.query(
            "INSERT INTO `rulehandle` (`changeId`, `timeStamp`, `endDateTime`, `startDateTime`, `value`, `ruleId`, `adminId`) VALUES (NULL, current_timestamp(), ? ,?, ?, ?, ?);",
            [end,start,value,ruleId,adminId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRuleChangeById:(ruleId,callBack) => {
        pool.query(
            "SELECT * FROM rulehandle WHERE rulehandle.changeId=?;",
            [ruleId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteRule:(ruleId,callBack)=>{
        pool.query(
            "DELETE FROM rulehandle WHERE rulehandle.changeId=?;",
            [ruleId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}