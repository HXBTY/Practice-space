const express = require('express');
let app = express();

// express中间件的使用方式
app.use((req, res, next) => {
  console.log('中间件的功能代码');
  
  next();
});

// 指定接口进行中间件处理
app.use('common/post', (req, res, next) => {
  console.log('指定接口进行中间件处理');
  
  next();
});

// 自定义中间件处理方式
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('自定义中间件处理方式');
    
    next();
  } else {
    next();
  }
});

// 设置一个get请求
app.get('/common/get', (req, res) => {
  console.log('get请求操作');
  res.send();
});

app.listen(8282 ,() => {
  console.log('8282...');
  
})