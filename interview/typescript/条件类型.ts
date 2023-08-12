/**
 * Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
 * Extract<T, U> -- 提取T中可以赋值给U的类型。
 * NonNullable<T> -- 从T中剔除null和undefined。
 * ReturnType<T> -- 获取函数返回值类型。
 * InstanceType<T> -- 获取构造函数类型的实例类型。
 */
interface Testone {
  name: string;
  age: number;
  isBoy: boolean
}

interface Testtwo {
  name: string;
  age: number;
  isGirl: boolean
}