/* Buffer 将数据转换为表示固定长度的字节序列 */
// buffer是在node全局中都可以使用，但是node官方还是建议显式引用它

import { Buffer } from 'node:buffer'

// Buffer.from 将指定数据
const buffer1 = Buffer.from('123')
const buffer2 = Buffer.from([1, 2, 3])

// Buffer.alloc 指定长短
// Buffer.alloc(size[, fill[, encoding]])
const buffer3 = Buffer.alloc(10)
const buffer4 = Buffer.alloc(12, 2) // 第二个参数为用于填充的值，若没有，则是默认填充0
const buffer5 = Buffer.alloc(12, '12', 'base64') // 第三给参数，指定编码类型 默认 utf8

buffer1.writeInt8(1, 1) // writeInt8(index, value)

console.log(buffer1); // 打印出来的为十六进制字节序列
console.log(buffer2);
console.log(buffer3);
console.log(buffer4);
console.log(buffer5);
