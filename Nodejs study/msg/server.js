/*
  功能简介
    1 进行首页的设置
      - 检测url是否为/或/index.html

    2 进行静态资源托管
      - 设置mimetype检测
      - 读取文件并进行响应

    3 设置新增接口 /addMsg post接口
      - 接收请求参数
      - 修改json文件
        文件写入操作： fs.writeFileSync
      - 服务端的跳转(重定向)
        - 状态码302
*/

// 1 引入模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

// 创建webServer
http.createServer((req, res) => {
  let reqUrl = req.url;
  // 页面请求处理 
  // 通过服务端渲染方式（现在通过调用接口再客户端进行页面渲染，基本不适用服务端渲染方式）
  if (reqUrl === '/' || reqUrl === '/index.html') {
    // 读取html文件
    let html = fs.readFileSync(path.join(__dirname, './public/message.html'), 'utf-8');
    let json = fs.readFileSync(path.join(__dirname, '/db.json'), 'utf-8');
    // 读取字符的json字符串转换为对象结构
    let jsonArr = JSON.parse(json);
    // 遍历jsonArr并进行结构拼接
    let liStr = '';
    jsonArr.forEach((ele) => {
      liStr += `<li class="media">
      <img class="mr-3" src="/public/assets/avatar.png" alt="${ele.name}" />
      <div class="media-body">
        <h4>${ele.name}</h4>
        <p>${ele.content}</p>
        <p>${ele._t}</p>
      </div>
    </li>`;
    });
    // 将拼接好的内容提花到html页面的指定位置
    html = html.replace('内容放置的位置', liStr);
    // 进行数据响应
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.end(html);

    // 静态资源托管
  } else if (reqUrl.startsWith('/public/')) {
    let mimeType;
    switch (path.extname(reqUrl)) {
      case '.css':
        mimeType = 'text/css;charset=utf-8';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
    }
    res.setHeader('content-type', mimeType);

    // 进行文件读取的处理
    // 因为静态资源读取可能出错，要做进行trycatch操作
    try {
      let data = fs.readFileSync(path.join(__dirname, reqUrl));
      res.end(data);
    } catch (err) {
      res.statusCode = 400;
      res.end();
    }

    // /addMsg的post接口功能设置
  } else if (reqUrl === '/addMsg' && req.method === 'POST') {
    let data = '';
    req.on('data', (temp) => {
      data += temp;
    });

    req.on('end', () => {
      data = qs.parse(data);
      // 先读取json文件
      // 希望将data写入到db，json中，但是位置不好把握
      // 设置方式：先读取json问价并转换为数组
      // - 进行数据的放入，位置为数组的最前面：arr.unshift(data)
      // - 将新的数据写入到db.json中即可（覆盖写入）
      // - fs.writeFileSync() fs.writeFile()
      // - 参数1：路径， 参数2：写入的内容， 参数3：字符集
      let json = fs.readFileSync(path.join(__dirname, '/db.json'), 'utf-8');
      let jsonArr = JSON.parse(json);

      // 将data放入到jsonArr的最前面
      // data中需要由_t的属性，设置为时间戳
      data._t = Date.now();
      jsonArr.unshift(data);

      // 将jsonArr转换为json字符传中进行写入
      fs.writeFileSync(path.join(__dirname, '/db.json'), JSON.stringify(jsonArr));

      // 设置重定向（跳转）
      // 用户点击提交后，请求的时/assMasg接口
      // 服务端希望在成功后让用户查看首页效果
      // 设置重定向操作，给用户响应首页页面
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  } else {
    res.end();
  }
}).listen(8181, () => {
  console.log('8181......');

});