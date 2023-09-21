/**
 * 判断系统和当前客户端环境
 */
// 获取当前环境变量
const userAgentInfo = navigator.userAgent;

/**
 * 判断客户端是否是移动端
 * @param info {string}
 * @returns {boolean}
 */
function judgeEnvironment(info = "") {
    const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) > 0) {
            flag = false
        }
    }
    return flag;
}

/**
 * 判断当前系统类型
 * @param info {string}
 * @return {string}
 */
function JudgementSystem(info = "") {
    const isAndroid = info.indexOf("Android") > -1 || info.indexOf("Adr") > -1;
    const isIOS = !!info.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let system = ""
    if (isAndroid) {
        system = "ANDROID"
    } else if (isIOS) {
        system = "IOS"
    }
    return system;
}