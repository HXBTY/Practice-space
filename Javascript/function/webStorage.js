/**
 * webStorage 提供了两种存储 localStorage | sessionStorage 大小通常为5MB
 * localStorage: 永久性（本地）存储，若是不主动删除，不会消失，可以实现多页面共享。
 * sessionStorage: 临时存储，只存在与页面会话期间，若窗口关闭则消失
 */
const key = "user"
let value = {
    name: "张三"
}
value = JSON.stringify(value)
const n = 0
// setItem 用于在Storage中设置数据，将value存储在key字段中
// value中可以存放任何数据，但是在存储时需要以字符串的形式存储
// key时数据的字段名，自定义；value中存放的时存储在本地的数据
localStorage.setItem(key, value);
sessionStorage.setItem(key, value);
// getItem 获取指定key字段value中的存储内容
localStorage.getItem(key);
sessionStorage.getItem(key);
// removeItem  清除指定存储内容
localStorage.removeItem(key);
sessionStorage.removeItem(key);
// clear 清除所有本地存储的数据
localStorage.clear();
sessionStorage.clear();
// key 通过索引值来获取对应索引位置存储内容的key n: number
localStorage.key(n);
sessionStorage.key(n);

