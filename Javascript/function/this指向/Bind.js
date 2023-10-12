function newBind(context, ...params) {
    const self = this
    return function (...finallyArgs) {
        return self.call(context, ...params,...finallyArgs)
    }
}