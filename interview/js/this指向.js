// 在函数中的this指向调用者, 谁调用函数就指向谁
let obj1 = {
  a: 123,
  b: '123',
  c: function() {
    console.log(this); // { a: 123, b: '123', c: [Function: c] }
  }
}
// console.log(obj1.c()); // this 指向obj1

// 函数在全局中被调用
function run() {
  console.log('run被执行了', this); // window
}

// run() // this 指向了全局, 即window, 实际上是window.run()

// 箭头函数
let obj2 = {
  a: 123,
  b: '123',
  c: function() {
    console.log(this); // { a: 123, b: '123', c: [Function: c] }
    (() => {
      /* 箭头函数本身没有this,因此它的this指向最近的父级this,
      在这里指向了c的this,因为c的this指向obj2,因此这个箭头函数也指向obj2 */
      console.log('箭头函数', this); // { a: 123, b: '123', c: [Function: c] }
    })()
  }
}
// obj2.c()

// this指向改变 call() bind() apply()

// call(a, b, c) 接收三个参数, a: this指向, b(非必要): 传递给函数的实参, c(非必要): 传递给函数的实参
function testCall() {
  console.log('传入的全部参数', arguments); // { '0': 3, '1': 4 }
  console.log(this); // { a: 1, b: 2 } 指向obj3
}
let obj3 = {
  a: 1,
  b: 2
}
testCall.call(obj3, 3, 4)

// apply(a, [b]) 接收两个参数 a: this指向; b(非必要): 传给被调用函数的实参
function testApply() {
  console.log('传入的全部参数', arguments); // { '0': 5, '1': 6, '2': 7, '3': 8 }
  console.log(this); // { a: 3, b: 4 } 指向obj4
}
let obj4 = {
  a: 3,
  b: 4
}
// testApply.apply(obj4, [5, 6, 7, 8])

// bind(a, b, c), a: this指向, b(非必要): 传递给函数的实参, c(非必要): 传递给函数的实参
// bind 不兼容ie6~8
/* bind与apply的区别是apply是直接改变对应函数的this指向, 而bind是生成了一个新的函数,
 然后改变新函数的this指向 */
function testBind() {
  console.log('传入的全部参数', arguments); // { '0': 7, '1': 8 }
  console.log(this); // { a: 5, b: 6 } 指向obj5
}
let obj5 = {
  a: 5,
  b: 6
}
// testBind.bind(obj5, 7, 8) 返回的是一个新函数, 需要在后面添加()进行调用
// testBind.bind(obj5, 7, 8)()