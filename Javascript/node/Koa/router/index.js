const Router = require("koa-router")
const router = new Router()
// const HomeRouter = require("../controller/home/index")
module.exports = (app) => {
    router.get("/login", app.controller.home.login)
    router.post("/loginResult", app.controller.home.loginResult)

    /**
     * allowedMethods 用于405状态码，若是不设置这个中间件，
     * 则通过get访问post接口时或使用post访问get接口时，返回404状态码
     */
    app.use(router.routes()).use(router.allowedMethods())
}