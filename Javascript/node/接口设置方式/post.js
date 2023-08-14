const http = require('http');
const qs = require('querystring');

http.createServer((req, res) => {
  if (req.url === '/common/post' && req.method === 'POST') {
    // 进行事件设置和参数接收
    // 数据传输中，数据为buffer格式
    // 因为数据可能是一段一段发送的，最终应当全部拼接起来在进行使用
    // 设置变量默认值为'',进行+=操作时，buffer会自动转换为字符串拼接

    let data = '';
    req.on('data', (temp) => {
      data += temp;
    });
    req.on('end', () => {
      data = qs.parse(data);
      Object.assign(data, {
        _t: Date.now(),
        code: 200,
        msg: '响应成功'
      });
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(data));
    })
  }
}).listen(8181, () => {
  console.log('8181....');
  
});