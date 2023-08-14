const fs = require('fs');

// 1.相对路径
// fs.readFile('./test.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw 'error';
//   }
//   console.log(data);
// });

// 2.直接复制绝对路径
// fs.readFile('D:\\LYH WORK\\黑马程序 87期就业班\\Nodejs\\Nodejs练习\\test.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw 'error';
//   }
//   console.log(data);
// });

// 3.__dirname 拼接
// console.log(__dirname);
// console.log(__filename, '长比上一个文件地址更深一层');

// 尝试将 __dirname 拼接为我们需要的地址内容
// let str = __dirname.split('\\');
// str.push('test.txt');
// str = str.join('\\')
// fs.readFile(str, 'utf8', (err, data) => {
//   if (err) {
//     throw 'error';
//   }
//   console.log(data);
// });

// 4.使用path模块进行路径的处理
const path = require('path');
// path.join() 用来将多部分传入的地址合并为一个可以使用的地址，并返回
let str = path.join(__dirname + '/test.txt');

fs.readFile(str, 'utf8', (err, data) => {
  if (err) {
    throw 'error';
  }
  console.log(data);
});