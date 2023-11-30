const Path = require("path");
const fs = require("fs");
module.exports = function (opts) {
    let { app, rules = [] } =  opts;
    if (!app) {
        throw new Error("this app params is necessary!")
    }
    // 提取app中的属性名
    const appKey = Object.keys(app);
    rules.forEach(item => {
        let { path, name } = item;
        if (appKey.includes(name)) {
            throw new Error(`the name of ${name} already exists!`)
        }
        let content = {};
        // 指定读取文件夹下的所有文件并便利
        fs.readdirSync(path).forEach(fileName => {
            // 获取文件后缀
            let extname = Path.extname(fileName);
            // 只处理js文件
            if (extname === ".js") {
                // 将文件名去掉后缀
                let name = Path.basename(fileName, extname);
                // 读取文件中的内容进行赋值，并绑定
                content[name] = require(Path.join(path, fileName));
            }
            if (!extname) {
                content[fileName] = require(Path.join(path, fileName, "index.js"))
            }
        });
        app[name] = content;
    })
}