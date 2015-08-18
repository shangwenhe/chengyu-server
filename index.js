/**
 * @FileName: test.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  08:03
 * @description: this is a new file
 */

var express = require('express');

var app = express();
app.set('views', __dirname + '/browser/page');
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// url
var url = require('url');

app.set('prot', 8090);
app.get('/', function (req, res) {
    res.type("text/html;charset=utf-8");
    var params = url.parse(req.url, true).query;
    console.log(params);
    if (params.name) {

        queryByName(params.name.replace(/\#.*$/, ''), function (data) {

            res.render('index', {
                title: data[0]['name'],
                data: data
            });

        })
    } else {

        getRandData(1, function (data) {

            res.render('index', {
                title: data[0]['name'],
                data: data
            });

        });
    }
});

// 随机取得数据
var getRandData = require('./widget/getData/getData');
app.get('/rand', function (req, res) {
    var params = url.parse(req.url, true).query;
    console.log(params.callback);
    res.type("text/html;charset=utf-8");
    getRandData(1, function (data) {
        var result = JSON.stringify(data);
        if (!!params.callback) {
            var result = params.callback + '(' + result + ')';
        }
        res.end(result);

    });
});


// 搜索框查询
var search = require('./widget/search/search');
app.get('/search', function (req, res) {
    var params = url.parse(req.url, true).query;
    res.type("text/html;charset=utf-8");
    // 将参数decodeURIComponent
    search(decodeURIComponent(params.k), function (data) {
        var result = JSON.stringify(data);
        if (!!params.callback) {
            var result = params.callback + '(' + result + ')';
        }
        res.end(result);

    })
});


// 按名字查询
var queryByName = require('./widget/queryByName/queryByName');
app.get('/get', function (req, res) {
    var params = url.parse(req.url, true).query;
    res.type("text/html;charset=utf-8");

    queryByName(params.name.replace(/\#.*$/, ''), function (data) {
        var result = JSON.stringify(data);
        if (!!params.callback) {
            var result = params.callback + '(' + result + ')';
        }
        res.end(result);

    })
});


app.get('/page.html', function (req, res) {
    res.render('page', {
        title: 'paint title'
    });
});
var list = require('./widget/list/list');
app.get('/list', function (req, res) {
    var params = url.parse(req.url, true).query;
    res.type("text/html;charset=utf-8");
    list(params, function (data) {
        var result = JSON.stringify(data);
        if (!!params.callback) {
            var result = params.callback + '(' + result + ')';
        }
        res.end(result);

    })
});

// 端口
app.listen(app.get('prot'), function () {
    console.log('OK');
});
