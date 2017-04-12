var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var expressSession = require('express-session');
var url = require('url')
var path = require('path');
var fs = require('fs');

var app = express();
app.use(cookieParser());

// app.use(cookieSession({
//     name: 'session',
//     keys: ['zfpx'],

//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

app.use(expressSession({
    secret: 'zfpx'
}))

app.get('/login', function(req, res) {
    // res.setHeader('Set-Cookie', 'name=zfpx')

    req.session.name = 'zfpx';
    res.end('hello')
});

app.get('/home', function(req, res) {
    // var cookie = req.headers['cookie'];
    // res.send(req.cookies);
    // res.send(req.session.name);

    if (req.session.name)
        res.send('欢迎你' + req.session.name);
    else
        res.send('请登录')
});

app.get('/logout', function(req, res) {
    req.session.name = null;
    res.end('退出登录')
});

app.listen(8080)