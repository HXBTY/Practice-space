/**
 * fetch(input[, init]) 发送一个请求, 返回一个 promise 对象
 * input: 可以是一个请求地址字符串, 默认为get请求; 也可以是一个 Request 对象
 * init: 可配置项 可选参数
 * 属于浏览器原生方法, 只能在浏览器内使用
 * 默认为get请求, 需要使用其他请求时, 可通过传入配置项
 * 内置了对JSON数据的解析, 不需要手动去转换JSON数据
 */
const config = {
    // 请求方式
    method: "POST",
    // 请求头
    headers: {},
    // 请求体
    body: {},
    // 请求模式 no-cors、*cors、same-origin 等
    mode: "no-cors",
    // 请求的凭证模式 include、*same-origin、omit
    credentials: "include",
    // 请求的缓存模式 default、 no-store、 reload 、 no-cache、 force-cache 或者 only-if-cached
    cache: "default",
    // 请求的重定向模式 可以是 manual、*follow、error 等
    redirect: "manual",
    // 可以是 no-referrer、client 或一个 URL, 可以为空
    referrer: "client",
    // 用于定义 referrer 字段的规则 no-referrer、 no-referrer-when-downgrade、origin、origin-when-cross-origin、 unsafe-url
    referrerPolicy: "default",
    // 选项允许检查响应是否与已知的预先校验和相匹配 值是一串哈希码 用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值
    integrity: "哈希码"
}

/**
 * 浏览器的属性 fetch 本身不支持取消请求, 可以通过 AbortController下的 abort()方法取消请求
 * @type {AbortController}
 */
const controller = new AbortController();
const signal = controller.signal;

fetch("https://localhost:8080", { ...config, signal })
    /**
     * response
     * response.body：一个简单的 getter，提供了响应内容的可读流（ReadableStream）。
     * response.bodyUsed：一个布尔值，用于记录响应体是否已经被使用过。
     * response.headers：与响应相关联的头部信息对象。
     * response.ok：一个布尔值，指示响应是否成功。
     * response.redirected：指示响应是否是重定向结果的布尔值。
     * response.status：响应的状态码。
     * response.statusText：与状态码对应的状态消息。
     * response.type：响应的类型。
     * response.url：响应的 URL。
     */
    .then(response => {
        // 处理响应体
        // response.ok boolean 返回true才表示这个请求成功 对应状态码 200-299; false 表示其他状态码
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseTypes = new Map([
            ['json', () => response.json()],
            ['text', () => response.text()],
            ['formData', () => response.formData()],
            ['blob', () => response.blob()],
            ['arrayBuffer', () => response.arrayBuffer()]
        ]);
        // 根据响应类型选择相应的解析方法
        const parser = responseTypes.get(response.type);
        if (parser) {
            return parser();
        } else {
            throw new Error('Unsupported response type');
        }
    })
    .then(response => {
        // 处理数据
    })
    .catch(error => {
        // 取消请求
        if (error.name === "AbortError") {
            // 请求被取消
        } else {
            // 处理其他错误
        }
    })

// 需要取消请求的时候, 调用abort()
controller.abort();

/**
 * fetch是基于 promise, 因此也可以使用 async/await
 */
async function fetchFun() {
    try {
        const response = await fetch("http://localhost:8080");
        if (response.ok) {
            // 处理响应的数据
        } else {
            throw new Error("请求失败")
        }
    } catch (error) {
        // 处理异常
    }
}