/**
 * 主入口
 */
const Koa = require("koa")
const app = new Koa()
const router = require("./router/index")

// 引入中间件
const middleware = require("./middleware/index")
middleware(app);
router(app)
app.listen(3000, () => {
    console.log("3000端口已被监听")
})
