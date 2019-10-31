const express = require('express');
const path = require('path');
const bp = require('body-parser');
let app = express();

// 引入cookie-parser中间件，用于获取一个对象形式的cookie数据
const es = require('express-session');

// 设置cp中间件
app.use(es({
  // 需要设置加密字符串，但是我们无法显示的看到变化
  //  - secret必须设置，否则出错
  secret: 'hello world'
}));

// - 设置bp的属性，引入为中间件
app.use(bp.urlencoded({
  extended: false
}));

// 托管静态资源
app.use(express.static(path.join(__dirname, '/public')));

// 进行接口设置
app.post('/login', (req, res) => {
  let {
    username,
    password
  } = req.body;
  if (username === 'admin' && password === '123456') {
    //  - 中间件给req设置了session属性，是对象结构，用来进行数据的读取和写入操作
    // loginStatus是自定义的名称，只是为了设置一个登录成功时的存储数据，用作之后判断用户是否登录过的依据
    req.session.loginStatus = 'yes';
    res.send({
      code: 200,
      msg: '登录成功'
    });
  } else {
    res.send({
      code: 404,
      msg: '登录失败'
    });
  }
});

// 设置isLogin接口进行登录状态检测
app.get('/isLogin', (req, res) => {
  // 检测loginStatus是狗为yes，并对其响应
  if (req.session.loginStatus === 'yes') {
    res.send({
      code: 200,
      msg: '用户已登录'
    });
  } else {
    res.send({
      code: 404,
      msg: '用户未进行登录'
    });
  }
});

// 设置/quit接口进行退出操作
app.get('/quit', (req, res) => {
  // 清除session
  // destroy是session清除的方法
  req.session.destroy();
  // 让用户重定向到login.html即可
  res.redirect('/login.html');
});

app.listen(8181, () => {
  console.log('8181....');

});