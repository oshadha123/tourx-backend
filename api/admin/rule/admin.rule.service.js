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

    }
}