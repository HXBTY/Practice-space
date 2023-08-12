const cluster = require("node:cluster");
const os = require("os");

// 判断当前是主进程的情况下
if (cluster.isMaster) {
  // os.cpu() 获取本机的cpu内核数量
  for (let index = 0; index < os.cpus().length / 2 ; index++) {
    cluster.fork();
  }
} else {
  require("./app");
}