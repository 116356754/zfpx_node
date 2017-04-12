var http = require('http');

var mime = require('mime')
var url = require('url')
var path =require('path');
var fs =require('fs');

http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname.slice(-1) =='/')
        path +='index.html'
    var realpath = path.join('public',pathname);
    var ext = path.extname(realpath);
}).listen(8080);

