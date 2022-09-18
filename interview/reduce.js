// 实现累加器reduce
let arr = [1, 2, 3, 4, 5]

Array.prototype.myReduce = function (callback, init) {
  let _length = this.length
  let _pre = init
  let _index = 0
  if (typeof callback !== 'function') {
    return new Error("not's a function")
  }
  // 如果初始值init没有传入，则默认数组的第0项为初始值
  if (_pre === undefined) {
    _index = 1,
    _pre = this[0]
  }
  for (_index; _index < _length; _index++) {
    _pre = callback.call(this, _pre, this[_index], _index, this)
  }
  return _pre
}

let result = arr.myReduce((pre, item, index, arr) => {
  console.log(pre, item, index, arr);
  return pre + item  
})
console.log(result);