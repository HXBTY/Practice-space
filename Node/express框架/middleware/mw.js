const express = require('express');
let app = express();

// 引入自己设置的模块bp.js 后缀js可写可不写
const bp = require('./tools/bp.js');
// 将bpbpMoni设置为中间件使用
app.use(bp.bpMoni);
// req = request/require 
// res = response
app.post('/common/post', (req, res) => {
  // console.log(req.body);
  // console.log(req);
  // console.log(res);
  
  res.end();  
});
app.listen(8282, () => {
  console.log('8282.....');
  
});