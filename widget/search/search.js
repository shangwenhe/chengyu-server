/**
 * @file:
 * @FileName: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  09:40
 * @description: this is a new file
 */


// widget/search/search.js start

var databaseconf = require(__dirname + '/../database/database');
var conn = databaseconf.createConn();

module.exports = function (key, callback) {
    conn.query('SELECT *  FROM `CY_name` WHERE `name` LIKE \'%北%\' LIMIT 5', function (err, data) {
        if(err){
        
        }else{
            callback && callback(data)
        }
    });
};
