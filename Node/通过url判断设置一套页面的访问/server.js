// 引入模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建一个webServer
http.createServer((req, res) => {
  // req.url 用来获取请求的地址
  let reqUrl = req.url;
  // 通过判断reqUrl读取不同的文件进行响应

  // 首页页面请求
  if (reqUrl === '/' || reqUrl === '/index.html') {
    // 读取对应的index.html文件即可
    //  - 操作中发现，请求地址中的文件路径和名称与服务端实际的文件路径和名称没有实际关联
    let filePage = path.join(__dirname, '/page/index.html');
    // 使用异步的读取方式
    fs.readFile(filePage, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      // 设置响应头头
      // 响应发送前设置响应头，避免中文的乱码情况
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      // 发送响应数据
      res.end(data);
    })

    // 设置css文件的响应
  } else if (reqUrl === '/style') {
    let filePage = path.join(__dirname, '/css/base.css');
    // 使用异步的读取方式
    fs.readFile(filePage, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/css;charset=utf-8');
      res.end(data);
    })

    // 设置js文件的请求
  } else if (reqUrl === '/script') {
    // --- 使用同步的文件读取方式
    //   - 在当前功能中，无论同步还是异步都需要读取完毕后再响应
    //     - 执行的效果没有区别，自然使用书写简单的方式：同步的读取方式
    //     - 如果设置'utf8'就是字符串内容，如果没设置，就是buffer
    res.setHeader('Contetn-Type', 'application/jacascript');
    res.end(fs.readFileSync(path.join(__dirname, '/js/common.js')));

     // 设置图片的请求
  } else if (reqUrl === '/pic') {
    res.setHeader('Content-Type', 'application/javascript');
    res.end(fs.readFileSync(path.join(__dirname, '/img/1.jpg')));

    // 设置favicon图标
  } else if (reqUrl === 'facicon.ico') {
    res.setHeader('Content-Type', 'imgage/x-icon');
    res.end(fs.readFileSync(path.join(__dirname, '/favicon.ico')));
  } else {
    res.end('Not Found');
  }

 



}).listen(8888, () => {
  console.log('监听了8888端口');
});