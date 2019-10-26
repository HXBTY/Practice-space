const express = require('express');
let get_API = express();

// 设置get接口
// get_API.get() 用来设置接口操作
// 参数1：接口地址  参数2：回调函数 内部的req和res就是http模块中的req、res
get_API.get('/common/get', (req, res) => {
  // express给req设置了属性query，值就是对象形式的get请求参数
  // 响应设置的方式为res.send() 具有通用共能，包含了join和end
  // 设置模拟/common/get接口的操作
  res.send(Object.assign({
    _t: Date.now(),
    code: 200,
    msg: '成功了'
  }, req.query));
});

get_API.listen(8080, () => {
  console.log('8080..............');
  
})