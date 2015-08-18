/**
 * @file:
 * @FileName: getData.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  08:10
 * @description: this is a new file
 */


// getData/getData.js start

var databaseconf = require(__dirname + '/../database/database');


var updateViews = require(__dirname + '/../views/views');
module.exports = function (len, callback) {

    var conn = databaseconf.createConn();

    // 查询出CY_name的最大ID 
    // 随机取得len条数据
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

                // 从数据中取得关联数据的详细内容
                conn.query('SELECT soundLetter,analysis,sample,fromto,synonyms,antonym,holding FROM `CY_analysis` WHERE id=' + item[key].relationId,
                    function (err, info) {
                        console.log(info);
                        info = info[0];
                        result.push({
                            name: item[key].name,
                            sound: info.soundLetter,
                            analysis: info.analysis,
                            sample: info.sample,
                            fromto: info.fromto,
                            synonyms: info.synonyms,
                            antonym: info.antonym,
                            holding: info.holding,
                            views: item[key].views
                        });
                        // 更新 views 字段
                        updateViews({
                            conn: conn,
                            id: item[key].relationId,
                            curviews: item[key].views
                        }, function () {

                            getAllInfo(item, ++key);
                        });
                    });
            }
        }
        getAllInfo(rows, 0);

    });
}
