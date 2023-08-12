// 实现Array.map函数
let arr = [1, 2, 3, 4, 5]

Array.prototype.myMap = function (callback) {
  let _length = this.length
  let _arr = []
  if (typeof callback !== 'function') {
    return new Error("not's a function")
  }
  for (let index = 0; index < _length; index++) {
    _arr.push(callback.call(this, this[index], index, this))
  }
  return _arr
}

let result = arr.myMap((item, index, array) => {
  if (item >= 3) {
    return item
  }
})
console.log(result);