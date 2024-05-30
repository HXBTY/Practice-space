new Promise((resolve, reject) => {
    console.log('执行一个promise函数');
//    resolve('success')
//    reject('error') // reject 如果不是抛出一个异常的话，则最后虽然走的还是catch，但是promise的状态是resolved
    reject(new Error('error'))
})
    .then(res => {
        console.log('resolve', res);
        return new Error('reject')
    })
    .catch(err => {
        console.log('reject', err);
        throw new Error('reject')
    });

(async function() {
    console.log('让我康康')
    throw new Error()
})().catch(() => {
//    console.log('杰哥不要')
    throw new Error()
})