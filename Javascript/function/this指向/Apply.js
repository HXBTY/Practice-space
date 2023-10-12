/**
 * 手动实现apply
 * @param context {*}
 * @param params {Array}
 */
function newApply(context, params) {
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