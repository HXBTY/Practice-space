/*
  制作一个登陆的功能
    - 前端操作：
      - login.html
        - 使用ajax将用户名和密码发送给服务端 /login 接口
        - 登录成功后自动跳转到index.html
      - index.html
        - 页面加载中，请求服务端的 /isLogin 接口，检测当前用户是否具有cookie

    - 后端处理：
      - /login 接口
        - 接收请求参数，检测是否登录成功 admin 123456
        - 登录成功时，给用户下发一个cookie信息，标识这个用户是登录过的
      - /isLogin 接口
        - 检测客户端的cookie信息，如果没有登录成功的标识，重定向到login.html即可
*/
const express = require('express');
const path = require('path');
const bp = require('body-parser');
let app = express();

// 引入cookie-parser中间件，用于获取一个对象形式的cookie数据
const cp = require('cookie-parser');

// 设置cp中间件
app.use(cp());
// 设置bp的属性，引入为中间件
app.use(bp.urlencoded({
  extended: false
}));
// 托管静态资源
app.use(express.static(path.join(__dirname, '/public')));

// 进行接口设置
app.post('/login', (req, res) => {
  console.log(req.body);
  
  let {
    username,
    password
  } = req.body;
  if (username === 'admin' && password === '123456') {
    // 设置cookie，让客户端保存登录状态信息
    // res.cookie()
    // - 参数1：要设置的数据名称 参数2：要设置的数据值
    res.cookie('loginStatus', 'yes', {
      expires: new Date(Date.now() + 1000 * 30)
    });
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
  // 获取cookie的数据
  // 通过cookie-parser中间件来进行cookie的格式处理
  // - 中间件给req设置了一个属性cookies
  if (req.cookies.loginStatus === 'yes') {
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
  res.clearCookie('loginStatus');
  res.redirect('login.html');
});
app.listen(8080, () => {
  console.log('8080....');

});