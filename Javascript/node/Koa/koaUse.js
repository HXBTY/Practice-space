const Koa = require("koa")
const koaUse = new Koa()

koaUse.use(async (ctx, next) => {
    await next()
    console.log(ctx.url)
    ctx.response.type = "text/html"
    ctx.response.body = "<h1>Hello world!</h1>"
})
koaUse.listen(3000, () => {
    console.log("3000端口已被监听")
})