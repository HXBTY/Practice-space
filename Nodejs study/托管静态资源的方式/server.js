const http = require('http');
const fs = require('fs');
const path = require('path');

// 闯将webServer
http.createServer((req, res) => {
  // 设置首页
  let reqUrl = req.url;
  if (reqUrl === '/' || reqUrl === '/index.html') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(fs.readFileSync(path.join(__dirname, '/public/page/index.html')));

    // 设置静态资源的托管
    // 如果reqUrl是以 /public/ 开头的，说明是静态资源请求
  } else if (reqUrl.startsWith('/public/')) {
    let ext = path.extname(reqUrl);
    let filePath = path.join(__dirname, reqUrl);
    // 进行css文件的读取和处理
    if (ext === '.css') {
      // 读取文件
      //  - 问题：因为是托管的静态资源，用户要访问的所有资源是统一处理的
      //    - 这时用户访问的是什么文件我根本不知道
      //    - 如果用户访问了服务端没有的文件，读取文件会报错，整个webServer会停掉

      try {
        let data = fs.readFileSync(filePath);
        res.setHeader('Content-Type', 'text/css;charset=utf-8');
        res.end(data);

      } catch (err) {
        // 读取失败时的处理
        res.statusCode = 404;
        // 设置响应状态码为404后，客户端认为这个文件没有找到，就没有将响应数据接收
        //  - 这里使用书写''就没有关系了
        res.end('not found'); // 若是statuCode为404，则响应数据的内容些什么都没有关系，因为浏览器中默认不会显示 因此写 '' 也可以
      }

      // 进行js类型文件的读取和响应
    } else if (ext === '.js') {
      try {
        res.setHeader('Content-Type', 'application/javascript');
        res.end(fs.readFileSync(filePath));
      } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/javascript');
        res.end('');
      }



    } else if (ext === '.jpg' || ext === '.gif' || ext === '.png') {
      if (ext === '.jpg') {
        try {
          res.setHeader('Content-Type', '	image/jpeg');
          res.end(fs.readFileSync(filePath));
        } catch (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/javascript');
          res.end('');
        }
      }
      // 设置css样式加载
    } else {
      res.end('ok');
    }
  } else {
    res.end('ok');
  }
}).listen(8080, () => {
  console.log('监视8080窗口');

});