const home = {
    login: async (ctx, next) => {
        await ctx.render("login", {
            btnName: "GoGoGo"
        })
    },
    loginResult: async (ctx, next) => {
        const { name, password } = ctx.request.body
        if (name && password) {
            ctx.response.body = "<h1>欢迎光临</h1>"
        } else {
            ctx.response.body = "<h1>请输入正确的账号与密码</h1>"
        }
    },
    register: async(ctx, next) => {
        const { app } = ctx;
        let params = ctx.request.body;
        let name = params.name;
        let password = params.password;
    }
}
module.exports = home;
