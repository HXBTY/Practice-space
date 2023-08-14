const express = require('express');
let app = express();
app.get('/getInfo', (req, res) => {
  // 设置可以让所有地址访问 设置跨域白名单
  // res.header('Access-Control-Allow-Origin', '*');
  // 设置指定地址，可以让指定地址访问
  let arr = ['http://localhost:5000', 'http://localhost:6666', 'http://localhost:7777'];
  let index = arr.indexOf(req.headers.origin);
  if (index !== -1) {
    res.header('Access-Control-Allow-Origin', req.header.origin);
  }
  res.send('ok');
});
app.listen(8181, () => {
  console.log('8181....');
});