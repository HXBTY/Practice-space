import { Socket } from "node:net"
import { Buffer } from "node:buffer"
// const net = require('node:net')

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const scoket = new Socket({})

scoket.connect({
  host: '172.20.10.5',
  port: 4000
})

let id = Math.floor(Math.random() * data.length)
let seq: number = 0

function encode(index: number) {
  let buffer = Buffer.alloc(4)
  buffer.writeInt16BE(seq)
  buffer.writeInt16BE(data[index], 2)
  seq++
  return buffer
}

scoket.write(encode(id)) // 发送给服务端

// 接收服务端发送的内容
scoket.on('data', (buffer: Buffer) => {
  const seq = buffer.subarray(0, 2).readInt16BE()
  const context = buffer.subarray(2)
  console.log(seq, context.toString());
})

setInterval(() => {
  id = Math.floor(Math.random() * data.length)
  scoket.write(encode(id))
}, 50)

export default scoket