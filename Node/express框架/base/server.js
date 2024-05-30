// 引入express
const express = require('express');
const path = require('path');

let app = express();

// 通过express进行静态资源托管
// 在app.use()中传入 express.static（静态资源所处目录的地址）
// 托管的是指定目录内部的文件，书写地址时不需要书写/public/
// 静态资源拖过功能内部已经做了失败处理，访问错误文件时，webserver也不会自动停止
// 出入到static()中的地址应当是绝对路径，否则终端打开位置不同，访问就会失败
app.use(express.static(path.join(__dirname, './public/')));

// 指定请求地址进行静态资源托管的访问
app.use('/admin', express.static(path.join(__dirname, './admin_public/')));
// express 进行静态资源托管时的规则：静态资源目录下的index.html为默认首页
// 如果叫别的名字就无法进行访问

// 监听端口
app.listen(8800, () => {
  console.log('8800');
  
})