var express = require('express');
var serverStatic = require('serve-static')
var url = require('url')
var path =require('path');
var app = express();

app.use('/img',serverStatic(path.join(__dirname,'img')));
app.listen(8080)