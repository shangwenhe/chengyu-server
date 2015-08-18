/**
 * @file:
 * @FileName: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  22:39
 * @description: this is a new file
 */


// widget/list/list.js start



var databaseconf = require(__dirname + '/../database/database');
module.exports = function (param, callback) {

    var conn = databaseconf.createConn();
    if (param.wl) {
        var wlArr = [];
        for (var i = 0; i < param.wl; i++) {
            wlArr.push('_');
        }
        var desc = wlArr.length > 5 ? 'DESC' : '';
        conn.query('SELECT * FROM `CY_name` WHERE name LIKE \'' + wlArr.join('') + '\' ORDER BY views ' + desc + ' LIMIT 30', function (err, data) {
            if (err) {} else {
                typeof callback === 'function' && callback(data);
            }
        });


    } else {
        conn.query('SELECT * FROM `CY_name` ORDER BY views LIMIT 30', function (err, data) {
            if (err) {} else {
                typeof callback === 'function' && callback(data);
            }
        });

    }
};
