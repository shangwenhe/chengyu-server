/**
 * @file:
 * @FileName: queryByName.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  20:08
 * @description: this is a new file
 */


// widget/queryByName/queryByName.js start


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

var updateViews = require(__dirname + '/../views/views');
var databaseconf = require(__dirname + '/../database/database');
module.exports = function (key, callback) {
    var conn = databaseconf.createConn();
    var key = decodeURIComponent(key);
    conn.query('SELECT *  FROM `CY_name` WHERE `name`=\'' + key + '\'', function (err, data) {
        if (err || !data[0]) {
            typeof callback === 'function' && callback([{
                error: true
            }]);

        } else {
            var id = data[0].id;
            conn.query('SELECT *  FROM `CY_analysis` WHERE `id`=\'' + id + '\'', function (err, info) {
                if (err) {

                } else if (!info[0]) {
                    typeof callback === 'function' && callback([{
                        error: true,
                        status: 'noresult'
                    }]);
                } else {
                    var result = [];
                    var info = info[0];
                    console.log(info);
                    result.push({
                        name: data[0].name,
                        sound: html2Escape(info.soundLetter),
                        analysis: html2Escape(info.analysis),
                        sample: html2Escape(info.sample),
                        fromto: html2Escape(info.fromto),
                        synonyms: info.synonyms,
                        antonym: info.antonym,
                        holding: info.holding,
                        views: data[0].views
                    });
                    console.log({
                        id: data[0].id,
                        curviews: data[0].views
                    })
                    updateViews({
                        conn: conn,
                        id: data[0].id,
                        curviews: data[0].views
                    }, function () {
                        conn.end();
                    });
                    typeof callback === 'function' && callback(result);
                }
            });
        }
    });
};
