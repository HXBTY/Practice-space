const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  // get接口的操作步骤
  // - get 接口分为两部分：接口名 + 参数
  // node中提供了一个url的内置模块，有一个parse()用来进行url处理
  // - 可以将url的每一部分都分开，成为一个对象形式
  // -- 返回值是一个对象，有两个我们需要的属性
  // -- pathname 路径名，即接口名称
  // -- query 请求参数，格式为 urlencoded
  let {pathname, query} = url.parse(req.url, true); // 这是一个对象的解构赋值操作 

  // 根据接口名，进行接口功能设置
  // - 这个get请求测试接口的功能为：将用户发送的请求参数发还给用户，并添加三个属性code、msg、_t
  if (pathname === '/common/get') {
    Object.assign(query, {
      _t:Date.now(),
      code: 200,
      msg: '响应成功'
    });

    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(query));
  }
  res.end();
  
}).listen(8080, () => {
  console.log('8080...');
  
});