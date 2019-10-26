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

    let mimeType;
    switch (ext) {
      case '.css':
        mimeType = 'text/css;charset=utf-8';
        break;
      case '.js':
        mimeType = 'application/javascript';
        break;
      case '.jpg':
        mimeType = 'image/jpeg';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.ico':
        mimeType = 'image/x-icon';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
    }

    res.setHeader('Content-Type', mimeType);

    try {
      let data = fs.readFileSync(path.join(__dirname, reqUrl));
      res.end(data);
    } catch (err) {
      res.statusCode = 404;
      res.end();
    }


  } else {
    res.end('ok');
  }
}).listen(8081, () => {
  console.log('监视8080窗口');

});