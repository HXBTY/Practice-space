/**
 * 上拉加载实现
 */

/**
 * 获取当前页面文档的滚动位置
 * @return {number}
 */
function getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

/**
 * 获取档期那可视区域高度
 * @return {number}
 */
function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

/**
 * 获取文档完整高度
 * @return {number}
 */
function getScrollHeight() {
    return Math.min(document.body.scrollHeight, document.documentElement.scrollHeight);
}

/**
 * 节流函数, 避免多次请求
 * @param methods
 * @param context
 */
function throttle(methods, context) {
    clearTimeout(methods.tID);
    methods.tID = setTimeout(() => {
        throttle(context)
    }, 300)
}

window.addEventListener("scroll", () => {
    if (getScrollTop() + getClientHeight() === getScrollHeight()) {
        // TODO 在这里进行下拉加载的判断, throttle(loadFunction) 调用加载下一页方法
        throttle()
    }
})