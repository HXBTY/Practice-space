/**
 * 所有对象都是通过 "new 函数" 创建的
 * 所有的函数也是对象，不过这个对象存在内存中
 * 所有的对象都是引用类型
 */
let obj = new Object({})
let arr = new Array()
let fun = new Function()

/**
 * 原型 prototype
 * 所有的函数都有一个属性：prototype
 * 默认情况下，prototype是一个普通函数
 * 默认情况下，prototype中有一个属性，constructor，它也是一个对象，指向构造函数本身
 *  - 即 function.prototype.constructor === function (结果为true)
 */
// obj与arr是对象，并不是函数，因此没有函数原型
console.log(obj.prototype) // undefined
console.log(arr.prototype) // undefined
console.log(fun.prototype.constructor === fun) // true

/**
 * 隐式原型 __proto__
 * 所有的对象都有一个属性：__proto__
 * 默认情况下，隐式原型指向创建该对象的函数的原型
 *  - 即 Object.__proto__ === Object.prototype (结果为true)
 * 当访问一个对象的成员时
 *  - 如果该对象有该成员，则直接使用该成员
 *  - 如果没有则查找该对象的隐式原型上是否有该成员
 *  - 如果该对象的隐式原型上也没有，则根据原型链依次查找，直到找到该成员或者查找到null为止
 * Function 的隐式原型指向它自身的 原型 即Function.__proto__ === Function.prototype
 * Object的prototype的__proto__指向null
 */
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype) // true
// 因为函数也是对象，因此fun也有隐式类型
console.log(fun.__proto__ === Function.prototype) // true