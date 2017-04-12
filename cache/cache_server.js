var fs =require('fs');
var http = require('http');

function expireHandler(filename,req,res){
    fs.readFile(filename,function(err,content){
        var expires = new Date(new Date().getTime()+30*1000);
        res.setHeader('Expires',expires.toUTCString());
        res.setHeader('Cache-Control','max-age=60');//兼容http1.0协议的缓存
        res.writeHeader(200,'ok');
        res.end(content);
    })    
}

function modifyHandler(filename,req,res){
    console.log(req.headers['if-modified-since']);
    var lastModified = req.headers['if-modified-since'];

    fs.stat('./'+filename,function(err,stat){
        if(err) console.error(err);
        console.log(stat.mtime.getTime()+'/'+lastModified);
        if(Math.floor(stat.mtime.getTime()/1000) == Math.floor(lastModified/1000))
        {
            // res.writeHeader(304);
            res.statusCode = 304;
            res.end();
        }
        else{
            res.setHeader('Last-Modified',stat.mtime.getTime());
            res.writeHeader(200,'ok');
            fs.createReadStream('./'+filename).pipe(res);
        }        
    }) 
}

var crypto = require('crypto');
function getHash(data){ 
    return crypto.createHash('sha1').update(data).digest('hex');
}

function eTagHandler(filename,req,res){
    fs.readFile(filename,function(err,content){
        var hash = getHash(content);
        var match = req.headers['if-none-match'];
        if(hash == match){
            res.statusCode = 304;
            res.end();
        }else{ 
            res.setHeader('ETag',hash);
            res.writeHeader(200,'ok');
            fs.createReadStream('./'+filename).pipe(res);
        }


    })
}

http.createServer(function(req,res){
    console.log(req.url);
    var filename = req.url.slice(1);

    if(filename =='favicon.ico')
        return res.end('404');
    // expireHandler(filename,req,res)
    // modifyHandler(filename,req,res);
    eTagHandler(filename,req,res);
}).listen(8080);