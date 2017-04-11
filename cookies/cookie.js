var http = require('http');
var server = http.createServer();
var url = require('url');

var querystring = require('querystring');

const SET_COOKIE = 'Set-Cookie';

server.on('request',function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;

    if(pathName == '/write'){
        res.setHeader(SET_COOKIE,['name=zfpx','age=6; HttpOnly;']);
        res.end('hello')
    }
    else if(pathName == '/read'){
        res.end(req.headers.cookie);
    }else{
        res.end('404');
    }
});

server.listen(8080);