var express = require('express');
//静态资源中间件
var serverStatic = require('serve-static')
var url = require('url')
var path =require('path');
var fs =require('fs');

var app = express();

app.use(function(req,res,next){
     console.log(req.headers);
     next();
})
app.use('/img',serverStatic(path.join(__dirname,'img')));

app.get('/',function(req,res){
   
    fs.createReadStream(path.join('static','index.html')).pipe(res)
});

app.listen(8080)