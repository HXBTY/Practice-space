let e = {
    arr: [],
    on(fn) {
        this.arr.push(fn)
    },
    emit() {
        this.arr.forEach(item => item())
    }
}
e.on(() => {
    console.log('杰哥不要');
})
e.on(() => {
    console.log('让我康康');
})
function fun() {
    e.emit()
}
fun()
