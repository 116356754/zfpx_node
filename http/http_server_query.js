var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');

server.on('request',function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;
    //req.setEncoding('utf8');
    if(pathName == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(pathName == '/get'){
        var query = urlObj.query;
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(JSON.stringify(query));
    }
    else if(pathName == '/post'){
        var result =''
        req.on('data',function(chunk){
            result +=chunk;
        });
        req.on('end',function(){
            var obj = querystring.parse(result);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end(JSON.stringify(obj));
        })
    }
    else if(pathName == '/file'){
        var out = fs.createWriteStream('./form.txt');
        req.pipe(out);

        var buffers =[];
        req.on('data',function(chunk){
            buffers.push(chunk);
        });
        req.on('end',function(){
            var final = Buffer.concat(buffers);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end(JSON.stringify(obj));
        })

        res.end('ok');
    }
    else{
        res.end('404');
    }
})

server.listen(8080);