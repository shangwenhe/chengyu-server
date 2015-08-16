/**
 * @file:
 * @FileName: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  09:40
 * @description: this is a new file
 */


// widget/search/search.js start

var databaseconf = require(__dirname + '/../database/database');

module.exports = function (key, callback) {
    var conn = databaseconf.createConn();
    var matchKey = 'name';
    var likeKey = key.replace(/(.)/g, '$1%');
    if (/^[a-z\s]*$/ig.test(key)) {
        matchKey = 'indexName';
        likeKey = key.replace(/(.)/g, '$1%');
    }
    conn.query('SELECT *  FROM `CY_name` WHERE `' + matchKey + '` LIKE \'' + likeKey + '\'  order by views DESC LIMIT 10', function (err, data) {
        if (err) {

        } else {
            conn.end();
            callback && callback(data)
        }
    });
};
