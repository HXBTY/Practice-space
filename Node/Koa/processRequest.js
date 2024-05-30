/**
 * 处理请求
 */
const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router({
    prefix: "/userManage"
})
// 处理请求body传参
const bodyParser = require("koa-bodyparser")

/**
 * http://localhost:3000/userManage/query?name=zhangsan&age=12
 * 如果请求参数益query的形式拼接在请求地址之后
 * 可以通过ctx.request.query/querystring 两种方式获取参数
 */
router.get("/query", async (ctx, next) => {
    // ctx.request.query 获取路径上的参数 返回一个对象
    console.log(ctx.request.query)
    const {name, age} = ctx.request.query
    console.log(name, age)
    // ctx.request.querystring 获取路径上的参数，返回一个字符串
    console.log(ctx.request.querystring)
    ctx.response.body = "<h1>/userManage</h1>"
})

/**
 * http://localhost:3000/userManage/param/libai/32
 * 如果参数通过 (/:参数) 的方式传参，可以通过params接受参数，返回一个对象
 */
router.get("/param/:name/:age", async (ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = "<h1>param/:id/:name</h1>"
})

/**
 * http://localhost:3000/userManage/form
 * 简单调用一个表单，发送post请求
 */
router.get("/form", async (ctx, next) => {
    ctx.response.body =
        `
      <form action="/userManage/paramsBody" method="post">
        <input name="name" type="text" placeholder="请输入用户名：admin"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
})

/**
 * 如果请求传入的参数是通过body传参，不管是koa还是node都没有处理body参数的方式
 * 引入koa-bodyparser，挂载到app上
 * 可以通过ctx.request.body获取body上的参数，返回一个对象
 */
router.post("/paramsBody", async (ctx, next) => {
    console.log(ctx.request.body)
    const { name, password } = ctx.request.body
    if (name && password) {
        ctx.response.body = "<h1>欢迎光临</h1>"
    } else {
        ctx.response.body = "<h1>请输入正确的账号与密码</h1>"
    }
})

app.use(bodyParser())
app.use(router.routes())
app.listen(3000, () => {
    console.log("3000端口已经被监听")
})