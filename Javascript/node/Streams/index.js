const fs = require("node:fs")
const { Duplex, Transform } = require("node:stream")

/**
 * 读取文件内容
 * @param path {string}
 * @param type {string}
 */
function read(path , type) {
    console.log(path, type)
    if (!path || !type) return
    const readStream = fs.createReadStream(path, type);

    readStream.on("data", (value) => {
        console.log(value)
    })

    readStream.on("end", () => {
        console.log("read end---")
    })

    readStream.on("error", (error) => {
        console.log(error)
        throw new Error(error)
    })
}

/**
 * 写入内容
 * @param path {string}
 * @param text {string}
 */
function write(path, text) {
    const writeStream = fs.createWriteStream(path)
    writeStream.on("finish", () => {
        console.log("数据已经被写入")
    })
    writeStream.on("error", (error) => {
        throw new Error(error)
    })
    writeStream.write(text)
    writeStream.end()
}

// write("../test.txt", "abc,bbc,cbc")
// read("../test.txt", "utf-8")

/**
 * Duplex 双工流，可读可写
 */
class MyDuplex extends Duplex{
    data = ""
    index = 0
    length = 0
    constructor() {
        super()
    }
    _read(size) {
        const lastIndexToRead = Math.min(this.index + size, this.length)
        this.push(this.data.slice(this.index, lastIndexToRead))
        this.index = lastIndexToRead
        if (size === 0) {
            this.push(null)
        }
    }
    _write(data, encoding, next) {
        const stringValue = data.toString()
        this.data += stringValue
        this.length += stringValue.length
        next()
    }
}

const duplexStream = new MyDuplex()

/**
 * 转换流
 */
function transform() {
    const uppercaseTransformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformData = chunk.toString().toUpperCase()
            this.push(transformData)
            callback()
        }
    })
    uppercaseTransformStream.on("data", (value) => {
        console.log(value)
    })
    uppercaseTransformStream.write("测试康康")
    uppercaseTransformStream.end()
}