const express = require('express');
let app = express();
app.get('/commont/get', (req, res) => {
  // 接收客户端传递的处理函数名称
  let callback = req.query.callback;
  let str = '{"name": "jack", "age": 18}';
  res.send(`${callback}('${str}')`);
});
app.listen(8181, () => {
  console.log('8181.....');
});