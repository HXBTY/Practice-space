// 接口
interface rules1 {
  name: string;
  age?: number;
  isPlay: boolean;
}
function fun1(param: rules1) {
  if (param.isPlay) {
    console.log(`${param.name}已经${param.age}岁了`)
  }
}
fun1({
  name: '张二狗',
  isPlay: true,
  age: 12
})

// 函数型接口 // 定义函数的参数类型与返回值类型
interface rules2 {
  (name: string, age: number): string
}
// 函数的形参名称不必与接口定义的名称相同
let fun2: rules2 = function (one: string, two: number): string {
  console.log(`${one}---${two}`);
  return `${one}---${two}`
}
fun2('李白', 12)

// 可索引接口 [索引名称: 索引类型]: 值类型
interface StringArray {
  /* 索引的类型只支持 string 与 number 两种索引可以同时使用,
    但是数字索引值必须是字符串. 因为将number作为索引时, js会将其转换为string之后,
    再去索引对象, 因此obj[100]就相当于obj['100']
  */
  [index: number]: boolean |string
}
let strArr: StringArray = {
  0: true,
  2: 'false',
  1: true
}
console.log(strArr[2]);
