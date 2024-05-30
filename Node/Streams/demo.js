const fs = require("node:fs")
const zlib = require("node:zlib")
const { Duplex, Transform  } = require("node:stream")

const readableStream = fs.createReadStream("../test.txt", "utf-8")

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const modifiedData = chunk.toString().toUpperCase()
        this.push(modifiedData)
        callback()
    }
})

const compressStream = zlib.createGzip()
const writableStream = fs.createWriteStream("../test.zip")
readableStream.pipe(transformStream).pipe(compressStream).pipe(writableStream)
writableStream.on("finish", () => {
    console.log("写入内容")
})
writableStream.on("error", (error) => {
    console.log(error)
    throw new Error(error)
})
