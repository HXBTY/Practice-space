const log4js = require("log4js");
const access = require("./access")
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];
const baseInfo = {
    appLogLevel: "debug", // 指定日志级别
    dir: "../../logs", // 指定日志存放目录
    env: "div", // 指定当前环境
    projectName: "Koa", // 项目名
    serverIp: "0.0.0.0" // 默认服务器地址
};
const {env, appLogLevel, dir, projectName, serverIp} = baseInfo;

module.exports = (options) => {
    const contextLogger = {};
    const appenders = {}
    const opt = Object.assign({}, baseInfo, options || {});
    const { env, appLogLevel, dir, projectName, serverIp } = opt;
    const commonInfo = { projectName, serverIp }
    appenders.cheese = {
        type: "dateFile",
        filename: `${dir}/cheese`, // 输出的文件名
        pattern: "yyyy-MM-dd.log", // 文件后缀名
        alwaysIncludePattern: true // 是否总是有后缀名
    }
    if (["dev", "local", "development"].includes(env)) {
        appenders.out = {
            type: "console"
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }
    const logger = log4js.getLogger("cheese");
    return async (ctx, next) => {
        const start = Date.now();

        log4js.configure(config)
        methods.forEach((method) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo));
            }
        })
        ctx.log = contextLogger;

        await next();

        const responseTime = Date.now() - start;
        logger.info(access(ctx, {
            responseTime: `响应时间为 -- ${responseTime / 1000}s`
        }, commonInfo))
    }
}