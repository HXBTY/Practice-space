/**
 * 与路径相关
 */

const location = window.location;
// 获取当前页面路径上的域名
const baseUrl = location.origin;
// 跳转新页面 这种方式跳转页面会被保存到历史会话中, 点击返回会返回之前一页
location.assign("新页面地址");
// 设置当前页面地址 也能实现跳转新页面的功能
location.href = "新页面地址";
// 替换当前页面路径 使用这种方式调准啊页面不会保存到历史会话中, 点击返回不会返回之前一页
location.replace("新页面地址");
// 重新加载当前页面
location.reload();

/**
 * 获取地址域名
 * @param url {string}
 * @return {string}
 */
function getBaseUrl(url = "") {
    let baseUrl = url || "";
    return baseUrl.replace(/[?#].*$/, "");
}

/**
 * 将url上的参数转为对象
 * @param url
 * @return {*}
 */
function getURLParameters(url) {
    const result = (url.match(/([^?=&]+)(=([^&]*))/g) || []);
    if (Array.isArray(result)) {
        return result.reduce(
            (a, v) => (
                (
                    a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)
                ),
                    a
            ),
            {}
        )
    }
}