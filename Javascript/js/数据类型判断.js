// typeof 无法区分对象,数组,null 返回的都是object
let a = 1
let b = '1'
let c = {}
let d = null
let e = undefined
let f = true
let g = []
console.log(typeof a); // number
console.log(typeof b); // string
console.log(typeof c); // object
console.log(typeof d); // object
console.log(typeof e); // undefined
console.log(typeof f); // boolean
console.log(typeof g); // object

// instanceof 用来判断是否是某个对象的实例,返回一个布尔值,常用于判断引用类型
// 缺点: 无法判断基本类型, 无法直接告知所判断的值的类型, 无法判断null与undefined
console.log(a instanceof Number); // false
console.log(new Number(a) instanceof Number); // true
console.log(b instanceof String); // false
console.log(new String(b) instanceof String); // true
console.log(c instanceof Object); // true
// console.log(d instanceof null); // 报错 无法判断null
// console.log(e instanceof undefined); // 报错 无法判断undefined
console.log(f instanceof Boolean);// false
console.log(new Boolean(f) instanceof Boolean);// true
console.log(g instanceof Array); // true

// Object.prototype.String.call() 万能方法 
// 缺点: 无法区分自定义对象类型
console.log(Object.prototype.toString.call(a)) // [object Number]
console.log(Object.prototype.toString.call(b)) // [object String]
console.log(Object.prototype.toString.call(c)) // [object Object]
console.log(Object.prototype.toString.call(d)) // [object Null]
console.log(Object.prototype.toString.call(e)) // [object Undefined]
console.log(Object.prototype.toString.call(f)) // [object Boolean]
console.log(Object.prototype.toString.call(g)) // [object Array]

// isArray 用于判断是否是数组 返回一个布尔值,因为是Array上的方法,一次需要通过Array.isArray()调用
console.log(Array.isArray(g)); // true

// 判断是否是空对象 
// 1. 通过JSON.stringify转换要判断的对象进行判断
console.log(JSON.stringify(c) === '{}') // true
// 2. 通过es6中的方法Object.keys()转换对象, 返回一个对象中可枚举的属性名称的数组
console.log(Object.keys(c).length === 0); // true
// 3. 通过for...in判断
console.log(((c) => {
  for (const key in c) {
    // hasOwnProperty 用于判断是否是对象本身的属性
    if (Object.hasOwnProperty.call(c, key)) {
      return false
    }
  }
  return true
})()) // true

