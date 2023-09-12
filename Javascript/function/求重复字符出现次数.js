let Num = Search('sdddrtkjsfkkkasjdddj')
function Search(str) {
  let obj = {}
  let num = 0
  for (let i = 0; i < str.length; i++) {
    // 判断, 如果对象中没有该对象成员, 就将其添加进该对象中, 并给该对象成员赋值为1, 若是有, 则给该对象成员的值加一
    if (!obj[str[i]]) {
      obj[str[i]] = 1;
    } else {
      obj[str[i]] = obj[str[i]] + 1
    }
  }
  for (let key in obj) {
    if (num < obj[key]) {
      num = obj[key]
    }
  }
  return num
}
console.log(Num);