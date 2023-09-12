/**
 * XMLHttpRequest
 * 是js的内置对象, 不仅支持 http 协议也支持 file://、FTP
 * 使用: 发送http请求实现网络通信, 创建下载连接与a标签结合实现下载文件
 * 缺点: 只能在浏览器端使用, 无法在服务器端使用
 */
// 创建对象
let xml = new XMLHttpRequest();

/**
 * 配置请求参数 xhrReq.open(method, url, async, user, password);
 * method: 请求方式(GET、POST, PUT, DELETE等)
 * url: 请求地址
 * async: 是否异步 默认为true boolean: true\false 可选参数
 * user: 用于进行http认证的用户名
 * password: 用于认证的用户密码
 */
xml.open(
    "GET",
    "http://localhost:8080",
    true,
    "username",
    "password"
);

/**
 * 设置请求头 setRequestHeader(header, value)
 * 必须在open之后, send之前执行
 * 如果多次修改同一个请求头, 那么最后对应的请求头是一个合并了多个值请求头
 * header: 属性名称
 * value: 属性值
 */
xml.setRequestHeader("Content-type", "application/json")

/**
 * timeout 设置请求超时时间
 * 单位为毫秒, 默认为0, 表示没有超时
 * 只能在异步请求中使用, 在同步请求中使用时会抛出异常
 * 设置时间在open之后, send之前
 * @type {number}
 */
xml.timeout = 2000;

/**
 * onreadystatechange
 * 用于监听请求的状态, 每次请求状态--readyState发生改变时, 都会触发该事件
 */
xml.onreadystatechange(() => {
    /**
     * readyState请求状态
     * 0: UNSENT 请求被创建, 但未调用open()方法
     * 1: OPENED open()方法已被调用
     * 2: HEADERS_RECEIVED send()方法被调用
     * 3: LOADING 请求进行中, 此时部分相应内容可能已经可以访问
     * 4: DONE 请求结束
     */
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            // 请求成功, 处理响应
        } else {
            // 请求失败, 根据状态码的不同, 可以做不同给处理
        }
    } else {
        // 请求进行中
    }
})

/**
 * xhrReq.send(body) 发送请求
 * body: 在XMLHttpRequest请求中要发送的请求体 可选参数 默认值为null
 */
xml.send()

/**
 * xhrReq.abort() 终止请求
 * 当一个请求发送出去时, 可以通过abort()终止该请求, 并将readyState重置为0
 */
xml.abort()

/**
 * getResponseHeader(header) 获取指定响应头头数据
 * header: 指定相应的key
 */
const contentType = xml.getResponseHeader("Content-type")

/**
 * getAllResponseHeaders() 获取全部相应头
 */
const allResponseHeader = xml.getAllResponseHeaders()

/**
 * onload 当请求成功并且完成相应数据的加载时触发
 */
xml.onload = function () {
    // 处理相应数据
}

/**
 * onerror当网络请求发生错误时触发
 */
xml.onerror = function () {
    // 处理错误
}

/**
 * onprogress 在数据传输过程中触发, 用于追踪请求进度
 */
xml.onprogress = function () {
    
}

/**
 * ontimeout 当请求超时时触发该事件
 */
xml.ontimeout = function () {
    // 处理请求超时
}

