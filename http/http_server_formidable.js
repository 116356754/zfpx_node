var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');

var formidable = require('formidable');

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
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            fs.createReadStream(files.avatar.path).pipe(fs.createWriteStream(files.avatar.name));
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            res.write('<h1>'+fields.username+'</h1>');
            res.write('<h1>'+fields.email+'</h1>')
            res.write('<img src='+files['avatar'].name+'/>')
            res.end();
        })
    }
    else{

        fs.exists('.'+pathName,function(exist){
            if(exist)
                fs.createReadStream('.'+pathName).pipe(res);
            else
                res.end('404');
        });
    }
});

server.listen(8080);