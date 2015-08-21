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
        matchKey = 'pinyin';
        key = key.replace(/ong|eng|ing|ang|ian|iao|an|au|ai|ia|ua|en|ei|ie|ue|in|iu|on|ou|uo|ui|un|a|e|i|o|u|v/ig, function (a, b, c) {
            return c.length === a.length + b ? a : a + '-';
        });
        likeKey = key + '%';
    }
    conn.query('SELECT *  FROM `CY_name` WHERE `' + matchKey + '` LIKE \'' + likeKey + '\'  order by views DESC LIMIT 10', function (err, data) {
        if (err) {

        } else {
            conn.end();
            callback && callback(data)
        }
    });
};
