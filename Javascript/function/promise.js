// 在循环体中使用async await
const array = new Array(20).fill({});
const url = "https://www.baidu.com";
Promise.all(array.map(async item => {
    item.value = await fetch(url);
    return item;
})).then(res => {
    // 处理回调
    console.log(res);
}).catch(error => {
    throw new Error(error)
})