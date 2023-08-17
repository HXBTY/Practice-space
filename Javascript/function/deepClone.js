// js实现深拷贝的方式
/*
 *  1. 使用json转换 JSON.parse(JSON.stringify(要拷贝的数据)
 *  缺点:
 *      ① 如果对象里面有函数或 undefined, 函数或 undefined 无法被拷贝下来, 将会丢失
 *      ② 无法拷贝对象原型链上的属性和方法
 *      ③ 当数据层次很深, 会栈溢出
 *      ④ 对象中有RegExp, Error对象, 则序列化的结果是空对象
 *      ⑤ 如果有object内有时间对象, 则得到的结果将只是字符串, 而不是时间对象
 *      ⑥ 如果对象内有NAN、Infinity(表示正无穷大的数值) 和 -Infinity， 则序列化结果为 null
 *      ⑦ 无法处理 function， 无法处理循环引用对象
 */

/*
 *  2. 使用普通递归函数
 *  缺点:
 *      ① 无法保持引用
 *      ② 当数据的层次很深, 会栈溢出
 */
function deepCopyRecursion(source) {
    if (!isObject(source)) return source; //如果不是对象的话直接返回
    let target = Array.isArray(source) ? [] : {} //数组兼容
    for (const k in source) {
        if (source.hasOwnProperty(k)) {
            if (typeof source[k] === 'object') {
                target[k] = deepCopyRecursion(source[k])
            } else {
                target[k] = source[k]
            }
        }
    }
    return target
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}

/*
 *  3. 防栈溢出函数
 *  优点:
 *      ① 不会栈溢出
 *      ② 支持很多层级的数据
 */
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while (loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

/*
 *  4. 使用lodash.js库实现 lodash.cloneDeep()
 *  https://www.npmjs.com/package/lodash.clonedeep 安装lodash.cloneDeep
 *  https://www.lodashjs.com/docs/lodash.cloneDeep  lodash.cloneDeep的使用
 *  层级太多的复杂对象拷贝可能会出现报错(其内部使用的是递归拷贝)
 */

/*
 *  5. jQuery 中的 extend 方法
 *  $.extend(true, {}, obj)
 *  当 $.extend 的第一个参数为 true 时, 是深拷贝. false 为浅拷贝; 实质是将第三个对象参数上的属性和对象复制到第二个参数对象上
 */

/*
 *  6. object.assign({}, obj) 实现深拷贝
 *  Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
 *  -- 但是当要拷贝的对象只有一级属性是, 才为深拷贝, 若是被拷贝的对象中有对象, 则为浅拷贝
 */
const target = {a: 1, b: 2};
const source = {b: 4, c: 5};
const returnedTarget = Object.assign(target, source);
console.log(target); // { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }

/*
 *  7. 使用 es6 的扩展运算符实现深拷贝
 *  const obj = { ...obj } 或  const { ..obj } = obj
 *  const arr = [ ...arr ] 或 const { ...arr } = arr
 *  -- 但是与 object.assign 相同, 若是多层级对象则是浅拷贝
 */

/*
 *  8. MessageChannel 实现深拷贝
 *  虽然能实现深拷贝, 但是拷贝有函数的对象时, 会报错
 *  MessageChannel 接口允许创建一个新的消息通道, 通过它的两个 MessagePort 发送数据,
 *  MessageChannel 接口实例化后, 会有两个 messagePort 属性发送参数
 *  此特性在 web worker 中可用
*/
let obj = {a: 1, b: {c: 2, d: 3,}, f: undefined}
obj.c = obj.b;
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c

function deepCopy(obj) {
    return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    });
}

deepCopy(obj).then((copy) => { // 请记住`MessageChannel`是异步的这个前提！
    let copyObj = copy;
    console.log(copyObj, obj);
    console.log(copyObj === obj);
});
