/**
 * 视图
 */
const Koa = require("koa")
const path = require("path")
const bodyParser = require("koa-bodyparser")
const nunjucks = require("koa-nunjucks-2")

const app = new Koa()
const router = require("./home")

app.use(nunjucks({
    ext: "html",
    path: path.join(__dirname),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防止xss
    }
}))

app.use(bodyParser())
router(app)
app.listen(3000, () => {
    console.log("3000端口已被监听")
})
