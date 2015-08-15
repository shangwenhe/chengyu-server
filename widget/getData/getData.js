/**
 * @file:
 * @FileName: getData.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  08:10
 * @description: this is a new file
 */


// getData/getData.js start

var mysql = require('mysql');


function html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g, function (c) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;'
        }[c];
    });
}

module.exports = function (len, callback) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'UMyygyisk!1',
        database: 'chengyu',
        port: 3306
    });

    conn.query('SELECT * FROM `CY_name` \
        WHERE id >= (SELECT floor(RAND() * (SELECT MAX(id) FROM `CY_name`))) \
        ORDER BY id LIMIT ' + len, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        var result = [];

        function getAllInfo(item, key) {

            if (item.length === key) {
                typeof callback === 'function' && callback(result);
                conn.end();
            } else {


                conn.query('SELECT soundLetter,analysis,sample,fromto,synonyms,antonym,holding FROM `CY_analysis` WHERE id=' + item[key].relationId,
                    function (err, info) {
                    console.log(info);
                        info = info[0];
                        result.push({
                            name: item[key].name,
                            sound: html2Escape(info.soundLetter),
                            analysis: html2Escape(info.analysis),
                            sample: html2Escape(info.sample),
                            fromto: html2Escape(info.fromto),
                            synonyms: info.synonyms,
                            antonym: info.antonym,
                            holding: info.holding

                        });
                        getAllInfo(item, ++key);
                    });
            }
        }
        getAllInfo(rows, 0);

    });
}
