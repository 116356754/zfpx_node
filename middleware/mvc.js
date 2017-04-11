var url = require('url');
var http = require('http');

//路由映射
var routes=[];

function use(path,action){
    routes.push([path,action]);
}

function add(req,res){
    res.end('add')
}

function del(req,res){
    res.end('del')
}

use('/users/admin/add',add);
use('/users/admin/del',del);

http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;

    for(var i=0; i<routes.length;i++)
    {
        var rout = routes[i];
        if(rout[0] == pathname){
            var action = rout[1];
            action(req,res);
            return;
        }
    }

    res.end('404');
}).listen(8080);