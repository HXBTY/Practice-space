/**
 * vue2.0 双向绑定的原理就是通过数据劫持与发布订阅模式相结合，在vue初始化的时候，通过es6提供的Object.defineProperty()，
  重写set、get方法来实现数据劫持，在数据发生变化时发布消息给订阅者，触发相印的监听回调（即数据发生变化，通知视图也同步发生变化）。
  缺点：Object.definedProperty（）有局限性，无法监听引用变量，即对象与数组
 */

let vm = {}, obj = {
  name: '张三',
  age: 12
}

for (const key in obj) {
  (function (key) {
    // obj, prop, descriptor. obj: 要定义属性的对象; prop: 要定义或者修改的属性名称; descriptor: 要定义或者修改的属性描述符(对象)
    Object.defineProperty(vm, key, {
      get: () => {
        console.log('get', obj[key]);
        return obj[key]
      },
      set: (newValue) => {
        console.log('set', newValue);
        obj[key] = newValue
      }
    })
  })(key)
}

vm.name = '李四'
console.log(vm.age);

/**
 * vue3.0 通过Proxy（代理），在目标对象之前设置一层拦截，外界对该对象的访问都需要接触这层拦截var proxy = new Proxy(target, handler);
  1、target: 是用Proxy包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
  2、handler: 是一个对象，其声明了代理target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。
 */

const p = new Proxy(obj, {
  // target: 目标对象; property: 被获取的属性名; receiver(非必要参数): proxy或者继承proxy的对象
  get: (target, property) => {
    return target[property]
  },
  // target, property, value, receiver
  set: (target, property, value) => {
    target[property] = value
  }
  
})
p.age = 23
console.log(p.name, p.age);

