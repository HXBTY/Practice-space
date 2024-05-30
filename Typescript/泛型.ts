// 泛型
function funOne<T>(param: T): T {
  console.log(param);
  if (typeof param === 'function') {
    param()
  }
  return param
}
funOne<string>('123')
funOne<number>(123)
funOne<null>(null)
funOne<Function>(() => {
  console.log('123', 123);
})

// 泛型接口
interface Rules<T> {
  (work: T): T
}
function funTwo<T> (param: T): T {
  console.log(param);
  
  return param
}
function funThree<T> (param: T): T {
  console.log(param);
  
  return param
}
let array: Rules<string>[] = [funTwo, funThree]
array.forEach((el, index) => {
  el(''+index)
});

// 泛型类
class Person<T> {
  name: T;
  constructor(name: T) {
    this.name = name
  }
  run(param: T): void {
    console.log(this.name + '在跑步');
    
  }
}
// 实例化类是去定义传入的属性
let per = new Person<string>('张三')

// 综合使用
interface MySql<T>{
  get(id: number): any
  add(param: T): boolean
  delete(id: number): boolean
  update(param: T, id: number): boolean
}

class Mysql<T> implements MySql<T> {
  constructor() {}
  get(id: number): any {
    console.log(id);
    return 
  }
  add(param: T): boolean {
    if (param) {
      return true
    } else {
      false
    }
  }
  delete(id: number): boolean {
    if (typeof id === 'number' && id >= 0) {
      return true
    }
  }
  update(param: T, id: number): boolean {
    if (param && id) {
      console.log(param);
      
      return true
    } else {
      false
    }
  }
}

class User {
  name: string
  id: number
  work: string
  password: string
  constructor() {
    
  }
}

let user = new User()
user.name = '张三'
user.password = '123456'
user.work = '扫地僧'
user.id = 1

let sql = new Mysql<User>()
sql.update(user, user.id)