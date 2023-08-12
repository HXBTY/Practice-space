// es5中的类与继承
function Person(name) {
  this.name = name;
  this.run = function () {
    console.log(`${this.name}在运动`);
  };
}
let p = new Person("王二狗");
p.run();
// 继承 (对象冒充伪类+原型继承) 两者结合互补,实现继承
function Me(name) {
  Person.call(this, name); // 对象冒充伪类(缺点:无法继承原型上的方法与属性)
}
Me.prototype = Person.prototype; // 原型继承(缺点:无法接收参数)
let m = new Me("张三");
m.run();

// es6中的类
class Human {
  name;
  constructor(name) {
    // constructor 构造函数, 在类被实例化的时候执行
    this.name = name;
  }
  work() {
    console.log(`${this.name}在工作`);
  }
}
let h = new Human("李四");
h.work();
// 继承
class We extends Human {
  age = 12;
  static game = "游戏王";
  constructor(name) {
    // es6中继承类不光需要使用extends实现继承,还要再子类的构造函数中调用super(),才能实现继承
    super(name);
  }
  static play() {
    console.log("play", this.game);
  }
}
let w = new We("李白");
w.work();
We.play();
