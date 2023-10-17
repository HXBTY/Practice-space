const Router = require("koa-router")
const router = new Router()

router.get("/login", async (ctx, next) => {
    await ctx.render("login", {
        btnName: "GoGoGo"
    })
})

router.post("/loginResult", async (ctx, next) => {
    const { name, password } = ctx.request.body
    if (name && password) {
        ctx.response.body = "<h1>欢迎光临</h1>"
    } else {
        ctx.response.body = "<h1>请输入正确的账号与密码</h1>"
    }
})

module.exports = function (app) {
    app.use(router.routes())
}