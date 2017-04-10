var dgram = require('dgram');

var client = dgram.createSocket('udp4');
// client.setEncoding('utf8');
client.on('message',function(msg,remoteInfo){
     console.log(msg.toString());
})
client.send('我是客户端',4000,'127.0.0.1');