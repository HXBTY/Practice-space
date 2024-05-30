/**
 * 设置中间件，将响应数据转换为json形式，并方法body中
 * @return {(function(*, *): Promise<void>)|*}
 */
module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json");
        this.body = JSON.stringify(json);
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx);
        await next()
    }
}