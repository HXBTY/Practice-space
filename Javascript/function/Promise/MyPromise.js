/**
 * 手写promise
 */

/**
 * promise状态枚举
 * @type {{FULFILLED: string, PENDING: string, REJECTED: string}}
 */
const STATUS = {
    PENDING: "pending",
    REJECTED: "rejected",
    FULFILLED: "fulfilled"
}

/**
 * 运行一个微队列
 * 将传入的函数放到微队列中
 * @param callback {Function}
 */
function runMicroTask(callback) {
    // 判断环境
    if (process && process.nextTick) {
        process.nextTick(callback)
    } else if (MutationObserver) {
        const p = document.createElement("p")
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true
        })
        p.innerText = "1"
    } else {
        setTimeout(callback, 0)
    }
}

/**
 * 判断是否是符合promise A+规范
 * @param data {any}
 * @return {boolean}
 */
function isPromise(data) {
    return !!(data && typeof data === "function" && typeof data.then === "function");
}
class MyPromise{
    _status = STATUS.PENDING
    _value = undefined
    _handles = []
    constructor(executor) {
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this._reject(e)
        }

    }

    /**
     * 执行队列
     * @private
     */
    _runHandlers() {
        if (this._status === STATUS.PENDING) return;
        while (this._handles[0]) {
            const handler = this._handles[0];
            this._runOneHandler(handler);
            this._handles.shift()
        }
    }

    /**
     * 处理一个handler
     * @param executor {Function}
     * @param status {string}
     * @param resolve {Function}
     * @param reject {Function}
     */
    _runOneHandler({executor, status, resolve, reject}) {
        runMicroTask(() => {
            if (this._status !== status) return;
            if (typeof executor !== "function") {
                this._status === STATUS.FULFILLED ? resolve(this._value) : reject(this._value);
                return;
            }
            try {
                const result = executor(this._value)
                if (isPromise(result)) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            } catch (err) {
                reject(err)
            }
        })
    }
    /**
     * 向处理队列中添加一个函数
     * @param executor {Function} 添加的函数
     * @param status {string} 该函数什么状态下执行
     * @param resolve {Function} 成功是执行
     * @param reject {Function} 失败时执行
     * @private
     */
    _pushHandles(executor, status, resolve, reject) {
        this._handles.push({
            executor,
            status,
            resolve,
            reject
        })
    }

    /**
     * 成功之后的调用函数
     * @param onFulfilled {Function}
     * @param onRejected {Function}
     */
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandles(onFulfilled, STATUS.FULFILLED, resolve, reject)
            this._pushHandles(onRejected, STATUS.REJECTED, resolve, reject)
            this._runHandlers() // 执行队列
        })
    }

    /**
     * 改变状态与数据
     * @param status {string}
     * @param data {*}
     * @private
     */
    _changeStatus(status, data) {
        // 状态只能由pending改变为fulfilled或者rejected, 且过程不可逆
        if (this._status !== STATUS.PENDING) return
        this._status = status
        this._value = data
    }

    /**
     * 成功操作
     * @param data {*}
     * @private
     */
    _resolve(data) {
        this._changeStatus(STATUS.FULFILLED, data)
    }

    /**
     * 失败操作
     * @param data {*}
     * @private
     */
    _reject(data) {
        this._changeStatus(STATUS.REJECTED, data)
    }
}

const pro = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('123')
    })
})

setTimeout(() => {
    pro.then((data) => {
        console.log(data)
        console.log(pro)
    })
}, 100)

