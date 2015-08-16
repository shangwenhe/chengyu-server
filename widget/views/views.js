/**
 * @file:
 * @FileName: views.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  16:26
 * @description: this is a new file
 */


// widget/views/views.js start

var databaseconf = require(__dirname + '/../database/database');


module.exports = function (info, callback) {
    var conn = info.conn || databaseconf.createConn();
    conn.query('UPDATE `chengyu`.`CY_name` SET `views` = ' + (+info.curviews + 1) + ' WHERE `CY_name`.`id` =' + info.id, function (err, items, filed) {
        typeof callback === 'function' && callback(err, items, filed);
    });
};
