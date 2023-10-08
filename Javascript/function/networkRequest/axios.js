/**
 * Axios
 * axios的本质是XHR的promise封装， 所以它同样也可以使用XHR的api
 */

axios({
    method: "post",
    url: "api/xxx",
    baseURL: "https://xxx",
    headers: {},
    // params中的数据会被添加到queryUrl中 一般用于get请求
    params: {},
    // 参数会被放在请求体 body 中
    data: {},
    timeout: 5000,
    /**
     * 值是一个数组
     * 设置后可以在向服务器发送请求前修改请求数据
     * 只能用于 post/put/patch这几个请求方式
     * 数组中最后函数必须返回一个字符串, 一个Buffer实例
     * 也可以修改请求头
     */
    transformRequest: [function(data, headers) {
        // 对发送的data进行处理
        return data;
    }],
    /**
     * 在响应数据传递给(then/catch)前, 允许修改响应数据
     */
    transformResponse: [function(data) {
        return data;
    }],
    // 用于序列化params的请求参数
    paramsSerializer: (params) => {
        // 序列化操作
        return params
    },
    // 处理上传进度 上传过程中会不断调用 onUploadProgress 这个方法
    onUploadProgress: (file) => {
        /**
         * 默认参数是每次上传的分片文件数据，其中的 file.loaded 表示已上传的文件大小
         * file.total 是文件的总大小
         * 进度 = (文件已上传/文件总大小)*100
         */
        const details = (file.loaded / file.total) * 100
    },
    /**
     * 定义对于http的状态码进行什么处理
     * 如果返回true则是resolve,繁殖则是reject
     * @param status
     * @return {boolean}
     */
    validateStatus: (status) => {
        return 200 <= status && status >= 300;
    },
    // 配置代理
    proxy: {
        protocol: "https",
        host: "",
        port: ""
    }
})