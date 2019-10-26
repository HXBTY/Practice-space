const express = require('express');
const bodyParser = require('body-parser');
let post_API = express();

// 对bodyParser进行配置设置
// 内部默认使用的是第三方模块 qs
// 内置模块为querystring
// extended的默认值为true，设置了false表示使用的是querystring模块
// 给req设置了一个新的body，保存了对象形式的请求体（post的请求参数）
post_API.use(bodyParser.urlencoded({extend: false}));

// 设置post接口
post_API.post('/common/post', (req, res) => {
  console.log(req.body);
  res.send(Object.assign({
    _t: Date.now(),
    code: 200,
    msg: '服务端响应成功'
  }, req.query))
});

post_API.listen(8181, () => {
  console.log(8181);
  
})