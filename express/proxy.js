var express = require('express');
//静态资源中间件
var httpProxy = require('http-proxy')
var url = require('url')
var path =require('path');
var fs =require('fs');

var app = express();

function proxyPass(host,target){
    var proxy = httpProxy().createProxyServer();
    return function(req,res,next){
        var currentHost = req.headers.host.split(':')[0];

        if(currentHost == host)
        {
            proxy.web(req,res,{
                target:target
            })
        }
        else
            next();
    }
}

app.use(proxyPass('zfpx.baidu.com','http://www.baidu.com'))
app.use(proxyPass('zfpx.qq.com','http://www.qq.com'))

app.get('/',function(req,res){
    res.writeHead(200,{'Content-Type':"text/html,charset='utf8'"});
    fs.createReadStream(path.join('static','index.html')).pipe(res)
});

app.listen(8080)