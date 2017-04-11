var express = require('express');

var url = require('url')
var path =require('path');
var fs =require('fs');

var app = express();

//可以提供的语言版本
app.use(checkLanguage(['en','zh-CN']));

app.get('/',function(req,res){   
    // if(req.selectedLan)
    console.log(req.selectedLan)
    fs.createReadStream(path.join('static',req.selectedLan,'index.html')).pipe(res)
    // fs.createReadStream(path.join('static','index.html')).pipe(res)
});

app.listen(8080)

function checkLanguage(lans){
    var defaultLan = lans[0].toLowerCase();
    return function(req,res,next){
        var acceptLans = req.headers['accept-language'];
        console.log(acceptLans);
        var orderlans = [];

        if(!acceptLans){
             req.selectedLan = defaultLan;
             return next();
        } 

        acceptLans.split(',').forEach(function(lan) {
            orderlans.push(lan.split(';')[0]);
        });

        for(var i=0 ; i<orderlans.length;i++){
            if(lans.indexOf(orderlans[i]) !=-1)
                req.selectedLan = orderlans[i];
                return next();
        }

        req.selectedLan = defaultLan;
    }
}