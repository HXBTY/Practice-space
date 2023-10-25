/**
 * 主入口
 */
const Koa = require("koa")
const path = require("path")
const bodyParser = require("koa-bodyparser")
// 引入 koa-nunjucks-2 对渲染的模板进行转移,避免xss
const nunjucks = require("koa-nunjucks-2")
// 引入 koa-static 用于处理静态文件
const staticFiles = require("koa-static")

const app = new Koa()
const router = require("./router/index")

// 指定public为指定静态文件目录
app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(nunjucks({
    ext: "html",
    path: path.join(__dirname, "controller", "home"),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防止xss
    }
}))

app.use(bodyParser())
router(app)
app.listen(3000, () => {
    console.log("3000端口已被监听")
})
