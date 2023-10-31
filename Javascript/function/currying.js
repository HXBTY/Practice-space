/**
 * 函数柯里化：将接收多个参数的函数变换成接收单一参数（原函数的第一个参数）的函数，
 * 并且返回接收余下参数而且返回结果的新函数。
 */
/**
 * 将一个函数柯里化
 * @param {fun} fun
 * @param {any[]} alreadyCollectedParams
 * @return {(function(...[*]): (*))|*}
 * @private
 */
function _Currying(fun, alreadyCollectedParams = []) {
    if (typeof fun !== "function") throw new Error("fun must be a function!");
    return function (...rest) {
        const currentParams = [...alreadyCollectedParams, ...rest];
        const currentLength = currentParams.length;
        // fun.length 函数的长度属性 === 函数被调用时传入的参数数量
        if (currentLength >= fun.length) return fun.apply(this, currentParams);
        return _Currying(fun, currentParams);
    }
}

/**
 * 将一个函数柯里化(简化写法)
 * @param {fun} f
 * @param {any[]} a
 * @return {function(...[*]): *}
 * @private
 */
const _CurryingSimplify = (f, a = []) => (...r) => (_ = [...a, ...r], _.length >= f.length ? f.apply(this, _) : _CurryingSimplify(f, _));

// 示例
function add(a, b, c) {
    return a + b + c;
}
const c_add = _Currying(add);
const c_s_add = _CurryingSimplify(add);
c_add(1)(2, 3); // 6
c_s_add(4)(5)(6); // 15