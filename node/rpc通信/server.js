"use strict";
exports.__esModule = true;
// const net = require('node:net')
var node_net_1 = require("node:net");
var data = {
    0: '这是0',
    1: '这是1',
    2: '这是2',
    3: '这是3',
    4: '这是4',
    5: '这是5',
    6: '这是6',
    7: '这是7',
    8: '这是8',
    9: '这是9',
    10: '这是10',
    11: '这是11',
    12: '这是12',
    13: '这是13'
};
var server = node_net_1.createServer(function (scoket) {
    // 读取通过监听data事件
    scoket.on("data", function (buffer) {
        var seq = buffer.subarray(0, 2);
        var id = buffer.readInt16BE(2);
        console.log(seq.readInt16BE(), id);
        setTimeout(function () {
            var result = Buffer.concat([
                seq,
                Buffer.from(data[id])
            ]);
            scoket.write(result);
        }, 10 + Math.random() * 100);
    });
});
// 创建服务器
server.listen(4000);
exports["default"] = server;
