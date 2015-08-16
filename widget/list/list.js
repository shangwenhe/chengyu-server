/**
 * @file:
 * @FileName: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  22:39
 * @description: this is a new file
 */


// widget/list/list.js start



var databaseconf = require(__dirname + '/../database/database');
module.exports = function (page, callback) {
    var conn = databaseconf.createConn();
    conn.query('SELECT * FROM `CY_name` ORDER BY views limit 30', function (err, data) {
       if(err){}else{
        typeof callback === 'function' && callback(data);
       } 
    });
};
