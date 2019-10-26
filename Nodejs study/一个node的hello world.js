const http = require('http');
const server = http.createServer(function (req, res) {
  console.log(`来自${req.connection.remoteAddress}的客户端在${new Date().toLocaleTimeString()}访问了本服务器`);
  res.end('<h1>hello world! very good!!</h1> <p>' + req.connection.remoteAddress + '</p>');
});
server.listen(8081, function () {
  console.log('服务器启动成功，请在http://localhost:8081中访问....');
});