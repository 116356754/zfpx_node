var http = require('http');
var url = require('url');
var fs = require('fs')
var path =require('path');

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname.slice(1);
    var paths = pathname.split('/');
    console.log(paths);

    var rootpath = './rout';
    var currpath =rootpath;
    for (var i = 0; i < paths.length; i++) {
        currpath = path.join(currpath, paths[i]);       
        if (fs.existsSync(currpath)){                                       
        } 
        else 
        {
            if(fs.existsSync(currpath+'.js')){
                break;
            }
            else
                return res.end('404');   
        }         
    }
    console.log(currpath);
    var jsHandle = require('./'+currpath+'.js');
    var fnHandle = jsHandle[paths[i+1]]
    var args = paths.slice(i + 2);
    console.log(args);
    if (typeof fnHandle == 'function')
        fnHandle.apply(null, [req, res].concat(args));
    else
        res.end('404');

}).listen(8080);