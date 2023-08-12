// 实现forEach

let arr = [1, 2, 3, 4, 5, 6]

Array.prototype.myForEach = function (callback) {
  let _length = this.length
  if (typeof callback !== 'function') {
    return new Error("not's a functoin")
  }
  for (let index = 0; index < _length; index++) {
    callback.call(this, this[index], index, this)
  }
}

arr.myForEach((item, index, arr) => {
  item += item
  console.log(item, index, arr);
})

