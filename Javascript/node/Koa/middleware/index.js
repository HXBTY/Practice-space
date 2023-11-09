/**
 * 集中调用中间件
 */
const miSend = require("./mi-send");
module.exports = (app) => {
    app.use(miSend())
}