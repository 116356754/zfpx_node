var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
var fs = require('fs');
// var querystring = require('querystring');

server.on('request',function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;
    if(pathName == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(pathName ='/get'){
        var query = urlObj.query;
        console.log(JSON.stringify(query));
        res.end('get');
    }
    else if(pathName ='/post'){

    }
    else{
        res.end('404');
    }
})

server.listen(8080);