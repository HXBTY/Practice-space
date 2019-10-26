const qs = require('querystring');
exports.bpMoni = (req, res, next) => {
  // 基本的事件处理设置
  let data = '';

  // app.on("mount",claaback(parent))
  // 这个事件当一个sub-app被挂载到一个父级应用程序时被触发，父级应用程序会被当做是一个参数传递给回调函数
  // 客户端请求的data和end事件
  // Data： 当服务端接收到数据时触发
  req.on('data', (temp) => {
    data += temp;
    // data = name=hanmeimie&age=23&gender=women
  });
  // Data： 当服务端接收到数据时触发
  req.on('end', () => {
    // 将relencoded处理为对象结构
    data = qs.parse(data);
    // 将处理后的data设置为req.body
    req.body = data;

    // next() 调用时，可以让请求继续触发后续的操作(中间件、请求处理)
    //	- 如果没有调用next，请求就不会继续向后执行
    //		- app.use(express.static(...)); 内部没有设置next，后续的请求处理就没有意义了
    next();
  })
}