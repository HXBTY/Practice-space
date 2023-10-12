/**
 * 手动实现call方法
 * @param context {*}
 * @param params {*}
 */
function newCall (context, ...params) {
    if (context === null || context === undefined) {
        context = window
    } else {
        context = Object(context)
    }
    let fn = Symbol()
    context[fn] = this
    context[fn](...params)
    delete context[fn]
}