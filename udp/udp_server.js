var dgram = require('dgram');

var server = dgram.createSocket('udp4');
// server.setEncoding('utf8');

server.on('listening',function(){
    console.log('服务器监听地址为:%s,端口为：%d',server.address().address,server.address().port);
});

server.on('message',function(msg,remoteInfo){
    console.log(msg.toString());
    server.send('hello',remoteInfo.port,remoteInfo.address);
})

server.bind(4000,'localhost');