/**
 * 思路
 * 1. 一个请求访问koa，出现错误
 * 2. 该错误会被http-error中间件捕捉
 * 3. 错误会被中间件的错误逻辑捕捉，并进行处理
 * 4. 错误处理逻辑根据错状态码，调用渲染页面逻辑
 * 5. 渲染页面逻辑渲染出对应的错误页面
 */

const Path = require("path");
const nunjucks = require("nunjucks");

module.exports = (opts = {}) => {
    const env = opts.env || process.env.NODE_ENV || "development";
    const folder = opts.errorPageFolder;
    const templatePath = Path.resolve(folder, "error.html")
    let fileName = "other"
    return async (ctx,next) => {
        try{
          await next();
          // 如果没有更改过response的status，那么koa默认的status是404
          if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
        } catch (e) {
            // 在此进行错误处理
            let status = parseInt(e.status);
            let message = e.message;
            if (status >= 400) {
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        fileName = status;
                        break;
                    default:
                        fileName = "other";
                        break;
                }
            } else {
                status = 500;
                fileName = status
            }
            const filePath = folder ? Path.join(folder, `${fileName}.html`) : templatePath;
            // 渲染对应错误页面视图，并传入参数
            try {
                // 指定目录
                nunjucks.configure(folder);
                const data = await nunjucks.render(filePath, {
                    env,
                    status: e.status || message,
                    error: message,
                    stack: e.stack // 错误的堆栈信息
                })
                ctx.status = status
                ctx.body = data
            } catch (e) {
                // 若中间件有异常，则抛出中间件的异常
                ctx.throw(500, `错误页面渲染失败：${e.message}`)
            }
        }
    }
}