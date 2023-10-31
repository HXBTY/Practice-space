// 实现Array.map函数
let arr = [1, 2, 3, 4, 5]

Array.prototype._map = function (callback) {
  if (typeof callback !== 'function') throw new Error("callback must be a function!")
  let _length = this.length
  let _arr = []
  for (let index = 0; index < _length; index++) {
    _arr.push(callback.call(this, this[index], index, this))
  }
  return _arr
}

let result = arr._map((item, index, array) => {
  if (item >= 3) {
    return item
  }
})
console.log(result);