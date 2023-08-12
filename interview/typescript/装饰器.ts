/* 
  装饰器 是一种特殊声明，本质上是一个函数，能够被附加到类、方法、属性、参数上
  通过@方法名的形式
  装饰器的写法分为两种: 普通装饰器(无法传参)、装饰器工厂(可传参)
  执行优先级: 属性>方法>方法参数>类
*/

// 类装饰器-------- 用于修改和替换类的定义

function logClassOne(params: any): any {
  // 无传参时, 装饰器的参数就是当前类的构造函数
  console.log("类装饰器(无参数版)---logClassOne", params);
}
function logClassTwo(param: any): any {
  // 有传参时, param是装饰器调用时传入的参数
  console.log("类装饰器(有参数版)", param);
  return function (target: any) {
    // 函数有唯一参数, 就是当前类的构造函数
    console.log('类装饰器(有参数版)---logClassTwo', target);
  };
}
function logClassTree(params: any): any {
  // 装饰器返回的值, 将使用提供的构造函数来替换类的声明
  return class extends params {
    name = "张三";
    run() {
      console.log(this.name);
    }
  };
}

// 方法装饰器--------- 用于修改和替换方法的定义
function logFunOne(params: any): any {
  console.log("方法装饰器", params); // 方法调用传入的参数
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    /**
     * 三个参数
     * 1: 对于静态成员来说是类的构造函数, 对于实例成员来说是类的原型对象
     * 2: 成员名称 strign
     * 3: 成员的属性描述符 即方法本体 (如果代码输出目标版本小于ES5，属性描述符将会是undefined)
     */
    console.log('方法装饰器---logFunOne', target, propertyKey, descriptor);
  };
}
function logFunTwo(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  /**
   * 三个参数
   * 1: 对于静态成员来说是类的构造函数, 对于实例成员来说是类的原型对象
   * 2: 成员名称 strign
   * 3: 成员的属性描述符 即方法本体 (如果代码输出目标版本小于ES5，属性描述符将会是undefined)
   */
  console.log('方法装饰器---logFunTwo', target, propertyKey, descriptor);
};

// 属性装饰器--------- 用于修改和替换属性的定义
function logAttrOne(params: any): any {
  console.log("属性装饰器", params);
  return function (target: any, attrKey: string) {
    /**
     * 两个参数
     * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
     * 2. 所修饰的成员名称 string
     */
    console.log('属性装饰器---logAttrOne', target, attrKey);
  };
}

function logAttrTwo(target: any, attrKey: string) {
  /**
   * 两个参数
   * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   * 2. 所修饰的成员名称 string
   */
  console.log('属性装饰器---logAttrTwo', target, attrKey);
};

// 方法参数装饰器----- 类构造函数或方法声明
function logParamOne(params: any) {
  console.log("方法参数装饰器", params);

  return function (target: any, propertyName: string, descriptor: number) {
    /**
     * 三个参数
     * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
     * 2. 所修饰的参数名称
     * 3. 所修饰的参数在对应的函数中的索引值
     */
    console.log("方法参数装饰器---logParamOne", target, propertyName, descriptor);
  };
}
//
function logParamTwo(target: any, propertyName: string, descriptor: number) {
  console.log("方法参数装饰器---logParamTwo", target, propertyName, descriptor);
}

@logClassOne // 普通装饰器
@logClassTwo("类装饰器参数") // 装饰器工厂
@logClassTree
class OrnamentOne {
  @logFunTwo
  @logFunOne("这是方法装饰器参数")
  play(
    @logParamTwo params: any,
    @logParamOne("方法参数装饰器参数") param: any
  ) {
    // 方法参数装饰器在参数内部调用
  }
  @logAttrOne("这是属性装饰器参数")
  @logAttrTwo
  public name: string | undefined;
  constructor() { }
}

let orn = new OrnamentOne();
orn.play('23', 23)
