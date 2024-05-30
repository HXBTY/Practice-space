const Koa = require("koa")
// koa-router引入的是一个函数
const router = require("koa-router")()

const Router = require("koa-router")
// 设置路由前缀
const userRoute = new Router({
    prefix: "/manage"
})

// 嵌套路由
const nestRouter = require("koa-router")()
const app = new Koa()

/**
 * get、post、put、del、all
 * all用于处理其他类型的请求类型
 */

// 添加路由
router.get("/", async (ctx, next) => {
    ctx.response.body = "<h1>/</h1>"
})

router.get("/home", async (ctx, next) => {
    ctx.response.body = "<h1>home</h1>"
})

router.get("/test", async (ctx, next) => {
    console.log("被嵌套了index")
    ctx.response.body = "<h1>nested</h1>"
})

// 会有ts报错，不知道为什么
// router.all("/*", async (ctx, next) => {
//     ctx.response.status = 404
//     ctx.response.body = "<h1>this is 404</h1>"
//     next()
// })

/**
 * 定义userRoute这个路由时，设置了路由前缀，因此通过它定义的路由都会默认带上定义时所配置的前缀
 * 例：/manage/name
 */
userRoute.get("/name", async (ctx, next) => {

})

/**
 * 命名路由
 */
try {
    router.get("/user", "users:id", (ctx, next) => {
        console.log("lls")
    })
// 生成路由 /user/3
    router.url("user", 3)

    router.use((ctx, next) => {
        // 路由重定向到 ”sign-n“
        ctx.redirect(ctx.router.url("sign-n"))
    })
} catch (e) {
    console.log(e)
}


/**
 * 多中间件
 * Koa-router支持一个路由中配置多个中间件
 */
// router.get(
//     "users/:id",
//     (ctx, next) => {
//         // 获取数据
//         next()
//     },
//     (ctx, next) => {
//         // 对数据进行特殊处理
//     }
// )

/**
 * 嵌套路由
 * router中配置的路由匹配时前缀要带上 /nest
 * 例如：/nest/user
 */
nestRouter.use("/nest", router.routes(), router.allowedMethods())


// 调用路由中间件
app.use(router.routes())
app.use(nestRouter.routes())
app.use(userRoute.routes())
app.listen(3000, () => {
    console.log("3000端口被监听")
})