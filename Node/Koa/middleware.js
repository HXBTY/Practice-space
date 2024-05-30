/**
 * koa的中间件流转
 * next(): 会将后面的代码会被流转到下一个中间件及后面的中间件执行结束之后再执行
 */
const Koa = require("koa")
const app = new Koa()

app.use(async (ctx, next) => {
    console.log("demo ---- 1")
    await next()
    console.log("demo next ---- 2")
})

app.use(async (ctx, next) => {
    console.log("demo ---- 3")
    await next()
    console.log("demo next ---- 4")
})

app.use(async (ctx, next) => {
    console.log("demo ---- 5")
})

app.listen(3001, () => {
    console.log("3001接口被监听")
})

/**
 * 结果
 * demo --- 1
 * demo --- 3
 * demo --- 5
 * demo next --- 4
 * demo next --- 2
 */