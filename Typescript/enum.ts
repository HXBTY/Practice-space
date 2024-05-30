// 数字枚举 如果值重复, 则后面的会将前面的覆盖
enum Color {
  red,
  blue,
  pink = 5,
  green = 4,
  skyBlue
}
console.log(Color);

console.log(Color.red) // 0 若是没有初始值, 则默认索引值为它的值
console.log(Color.green); // 6 若是前一位有赋值, 而其本身没有赋值, 则值为前一位的值+1
let b = Color.blue
console.log(Color[1]); // 数字枚举具有反向映射的能力, 可以通过枚举值, 映射出枚举对应的属性名


// 字符串枚举 使用字符串枚举, 必须每一个值都进行初始化
enum Animal {
  dog = '狗',
  cat = '猫',
  pig = '猪'
}
console.log(Animal.cat)

