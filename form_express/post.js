var express = require('express');
//静态资源中间件
var serverStatic = require('serve-static');

var bodyParser = require('body-parser');
var multer = require('multer');
var mime = require('mime');
var url = require('url')
var path = require('path');
var fs = require('fs');

//var upload = multer({ dest: 'uploads/' })
var app = express();

app.set('view engine', 'html')
app.set('views', __dirname)
app.engine('html', require('ejs').__express)

app.use(serverStatic(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/user/:uid', function(req, res) {
//     res.end(req.params.uid);
// })

var users = [];

app.param('uid', function(req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.uid) {
            req.user = users[i];
            break;
        }
    }
    next();
});
app.post('/user/add', multer().single('avatar'), function(req, res) {
    users.push(req.body);
    console.log(req.file);
    fs.createWriteStream(req.file.originalname)
    fs.writeFile(req.file.originalname, req.file.buffer, function(err) {
        if (!err)
            console.log('sava avatar success')
        else
            console.error(err);
    })
    res.json(req.body);
})

app.use('/user/edit/:uid', function(req, res) {
    res.render('form', { user: req.user })
    console.log(req.user)
        // res.json(req.user)
})

app.listen(8080)