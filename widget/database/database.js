/**
 * @file:
 * @FileName: database.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  09:41
 * @description: this is a new file
 */


// widget/database/database.js start



var mysql = require('mysql');

module.exports = {
    createConn: function () {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            // password: 'UMyygyisk!1',
            password: 'umyygyisk',
            database: 'chengyu',
            port: 3306
        });
    },
    end: function (conn) {
        conn && conn.end()
    }
};
