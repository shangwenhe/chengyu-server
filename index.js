/**
 * @FileName: test.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  08:03
 * @description: this is a new file
 */

var express = require('express');

var getRandData = require('./widget/getData/getData');

var app = express();
var url = require('url');
var ejs = require('ejs');
app.set('views', __dirname + '/browser/page');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


app.set('prot', 8090);
app.get('/', function (req, res) {
    res.render('index', {title:'paint title'});
});
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

app.listen(app.get('prot'), function () {
    console.log('OK');
});
