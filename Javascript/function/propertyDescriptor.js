/**
 * 属性描述符
 * 属性描述符只能是两种类型：数据描述符、访问器描述符；描述符只能是两种类型之一，不能同为两者
 * 数据描述符：具有可写或不可写的属性
 * 数据描述符：通过getter/setter函数获取/设置描述符的属性
 */

let data = {
  name: "张山",
  age: 12,
};

/**
 * Object.getOwnPropertyDescriptors(object)
 * 获取一个对象里面所有属性的属性描述符
 */
let descriptors = Object.getOwnPropertyDescriptors(data);
console.log(descriptors);

/**
 * Object.getOwnPropertyDescriptor(object, key)
 * 获取对象中指定成员的属性描述符
 */
let nameDescriptor = Object.getOwnPropertyDescriptor(data, "name");
console.log(nameDescriptor);

/**
 * Object.defineProperty(object, key, descriptor)
 * object: 被修改的对象
 * key: 指定要修改的属性描述符key
 * descriptor: 属性描述符要设置的值
 * 设置指定属性的属性描述符
 * configurable: 默认值为false 是否允许属性描述符被再次设置
 * enumerable: 默认为false, 当前属性是否可以被枚举， 如果设置为false，则不可通过forin遍历
 * value: 设置属性值
 * writable: 默认为false, 该属性是否运行被赋值运算符重新赋值
 * get: 自定义属性的getter函数, 若未设置则为undefined
 * set: 自定义set函数, 默认值为undefined
 * 如果一个属性的属性描述符没有 value、writable、get、set中的任何一个, 那这个属性描述符视为数据描述符
 * 如果同时具有[value 或 writable]和 [get 或 set], 那么会抛出异常
 */
Object.defineProperty(data, "name", {
  enumerable: true,
  configurable: true,
  value: "张三",
  writable: false, // 不可重写
});

/**
 * 访问器描述符 通过getter/setter设置描述符的属性
 */
let Value = null // 临时存储的变量
Object.defineProperty(data, "name", {
  get() {
    return Value
  },
  set(newValue) {
    Value = newValue
  },
  enumerable: true,
  configurable: false
})