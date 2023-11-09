/**
 * 集中调用中间件
 */
const path = require("path");
const bodyParser = require("koa-bodyparser");
// 引入 koa-nunjucks-2 对渲染的模板进行转移,避免xss
const nunjucks = require("koa-nunjucks-2");
// 引入 koa-static 用于处理静态文件
const staticFiles = require("koa-static");
const ip = require("ip");
const miSend = require("./mi-send");
const miLog = require("./mi-log");

module.exports = (app) => {
    // 注册中间件
    app.use(miLog({
        env: app.env,
        projectName: "Koa",
        appLogLevel: "debug",
        dir: "logs",
        serverIp: ip.address()
    }))
    // 指定public为指定静态资源文件目录
    app.use(staticFiles(path.resolve(__dirname, "../", "./public")))
    app.use(nunjucks({
        ext: "html",
        // path.join(__dirname, "../") 可以获取当前项目的根目录
        path: path.join(__dirname, "../", "public", "html"),
        nunjucksConfig: {
            trimBlocks: true // 开启转义 防止xss
        }
    }))

    app.use(bodyParser())
    app.use(miSend())
}