"use strict";
exports.__esModule = true;
var node_net_1 = require("node:net");
var node_buffer_1 = require("node:buffer");
// const net = require('node:net')
var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var scoket = new node_net_1.Socket({});
scoket.connect({
    host: '172.20.10.5',
    port: 4000
});
var id = Math.floor(Math.random() * data.length);
var seq = 0;
function encode(index) {
    var buffer = node_buffer_1.Buffer.alloc(4);
    buffer.writeInt16BE(seq);
    buffer.writeInt16BE(data[index], 2);
    seq++;
    return buffer;
}
scoket.write(encode(id)); // 发送给服务端
// 接收服务端发送的内容
scoket.on('data', function (buffer) {
    var seq = buffer.subarray(0, 2).readInt16BE();
    var context = buffer.subarray(2);
    console.log(seq, context.toString());
});
setInterval(function () {
    id = Math.floor(Math.random() * data.length);
    scoket.write(encode(id));
}, 50);
exports["default"] = scoket;
