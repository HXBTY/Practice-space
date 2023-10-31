/**
 * 嵌套数据扁平化
 */
let arr = [[1, [2], [3, [4, [5]]]], [6], 7];

/**
 * 使用循环遍历
 * @param {any[]} targetArray
 * @param {any[]} container
 * @return {*[]}
 */
function ergodic(targetArray, container = []) {
    if (!Array.isArray(targetArray)) return container;
    targetArray.forEach(item => {
        if (!Array.isArray(item)) {
            container.push(item);
        } else {
            ergodic(item, container);
        }
    })
    return container;
}

ergodic(arr); // [1, 2, 3, 4, 5, 6, 7]

/**
 * 使用Array.flat()方法 传入参数为递归层数，默认为1
 * @param {number[] | string[]} targetArray
 * @return {FlatArray<FlatArray<*, number>[], number>[]|*[]}
 * @private
 */
function _flat(targetArray) {
    if (!Array.isArray(targetArray)) return [];
    let loop = targetArray;
    while (1) {
        const beforeFlat = loop.length;
        // Infinity 表示正无穷
        const arr = loop.flat(Infinity);
        const afterFlat = arr.length
        if (beforeFlat === afterFlat) return arr;
        loop = arr;
    }
}

_flat(arr); // [1, 2, 3, 4, 5, 6, 7]

/**
 * 使用栈插入
 * @param {any[]} targetArray
 * @return {*[]}
 * @private
 */
function _stack(targetArray) {
    if (!Array.isArray(targetArray)) return [];
    const array = [...targetArray];
    const result = [];
    while (array.length) {
        const tmp = array.pop();
        if (Array.isArray(tmp)) {
            array.push(...tmp);
        } else {
            result.push(tmp);
        }
    }
    return result;
}

_stack(arr); // [7, 6, 5, 4, 3, 2, 1]