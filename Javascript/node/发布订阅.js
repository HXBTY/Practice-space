/**
 * 一个简单的发布订阅模式
 * @type {{arr: *[], emit(): void, on(*): void}}
 */
const event = {
    arr: [],
    on(fn) {
        this.arr.push(fn)
    },
    emit() {
        this.arr.forEach(item => item())
    }
}
event.on(() => {
    console.log('杰哥不要');
})
event.on(() => {
    console.log('让我康康');
})
function fun() {
    event.emit()
}
fun()
