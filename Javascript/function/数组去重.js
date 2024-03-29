let arr = [12, 12, 3, 4, 3, 4, {}, {}, NaN, NaN, null, null];

function unique(arr) {
	// 1. ES5种常规做法, 使用两层for循环, 注意第二层for循环中变量的初始值为第一个循环的变量加1,因为始终要要与后一个进行比较, 但是这种写法时间复杂度太大
	// for (let i = 0; i < arr.length; i++) {
	// 	for (let j = i + 1; j < arr.length; j++) {
	// 		if (arr[i] === arr[j]) {
	// 			arr.splice(i, 1);
	// 		}
	// 	}
	// }
	// return arr

	// 2. 使用Set()方法, 返回的是一个新的Set对象(是一个伪数组) 在ES6中常用
	// 但是这种方法无法去掉"{}"空对象
	// return Array.from(new Set(arr))

	// 3.利用indexOf
	// 新建一个数组, 判断结果数组是否存在当前元素,如果有相同的值则跳过, 不相同则push进数组
	// let array = []
	// for (let i = 0; i < arr.length; i++) {
	// 	if (array.indexOf(arr[i]) === -1) {
	// 		array.push(arr[i])
	// 	}
	// }
	// return array

	// 4. 利用sort()方法, 若是不使用参数, 则默认根据首字符升序, 若首字符相等, 则往后类推
	// arr = arr.sort()
	// var array = [];
	// for (let i = 0; i < arr.length; i++) {
	// 	// 排序过后, 对相邻的两个元素进行比较
	// 	if (arr[i] !== arr[i + 1]) {
	// 		array.push(arr[i]);
	// 	}
	// }
	// return array

	// 5. 利用对象属性, 进行去重(这种数组去重的方法有问题, 不建议使用, 有待改进),
	// let array = [];
	// let obj = {};
	// for (let i = 0; i < arr.length; i++) {
	// 	if (!obj[arr[i]]) {
	// 		array.push(arr[i]);
	// 		obj[arr[i]] = 1;
	// 	} else {
	// 		obj[arr[i]]++
	// 	}
	// }
	// return array

	// 6. 利用includes进行控制 includes(): 可以检测数组或字符串是否含有第一个参数(必须), 第二个参数可不写, 意为从哪一个索引位开始查找
	// 不能对对象进行去重
	// let array = []
	// for (let i = 0; i < arr.length; i++) {
	// 	// 检测新宿组array中是否包含原数组中的成员
	// 	if (!array.includes(arr[i])) {
	// 		array.push(arr[i]);
	// 	}
	// }
	// return array

	// 7. 利用hasOwnProperty判断是否存在对象属性
	// let obj = {};
	// /*
	// 	filter()方法会创建一个新的数组, 新数组中的元素是通过检查指定数组中符合条件的所有元素(filter不会对空数组进行检测, 不会改变原数组)
	// 	filter()第一个参数必须是一个函数, 并且原数组中的每个元素都会执行这个函数; 第二个参数为可选参数, 该参数作为该执行回调时使用, 传递给函数, 用作'this'的值, 如果内部使用this, 但是没有传入第二个参数, 则this的值为undefined
	// 	该函数可以有三个参数:
	// 		- 第一个参数为(必须), 当前元素的值
	// 		- 第二个参数(可选), 当前元素的索引值
	// 		- 第三个参数(可选), 原数组
	// */
	// return arr.filter(function(item, index, arr) {
	// 	// hasOwnProperty(): 这是object的一个方法, 用于判断对象是否包含特定的自身属性, 返回一个布尔值
	// 	// typeof item + item: 输出的时类型与数组成员的拼接, typeof只检测第一个itme
	// 	// return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
	// 	return obj.hasOwnProperty(item) ? false : (obj[item] = true)
	// })

	// 8. 使用filter
	// 不能去除重复的空对象
	// return arr.filter(function(item, index, arr) {
	// 	// indexOf(): 在数组中检索一个给定的元素, 返回该元素第一次出现的索引, 若不存在者返回-1
	// 	// 有两个参数, 第一个是检索的元素, 第二个为可选参数, 默认为0
	// 	/*
	// 		第二个参数是检索开始位置(可以为负数), 若是索引值大于等于数组长度, 表示不会在该数组中查找, 直接返回-1; 若是提供的索引参数是一个负数, 则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找.注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。
	// 	*/
	// 	return arr.indexOf(item, 0) === index;
	// });

	// 9. 利用递归去重
	// 不能对空对象, NaN进行去重
	// let len = arr.length;
	// // 必须先进行排序
	// arr.sort((a, b) => a - b);
	// // 使用一个倒序比较的方式, 从尾部比较到头部
	// function loop(index) {
	// 	if (index >= 1) {
	// 		if (arr[index] === arr[index - 1]) {
	// 			arr.splice(index, 1);
	// 		}
	// 		loop(index - 1);
	// 	}
	// }
	// loop(len - 1);
	// return arr

	// 利用Map数据结构去重, 创建一个空Map数组, 遍历需要去重的数组, 把每个数组的每一个元素作为key存到Map中. 由于'Map中不会出现相同的key值', 所以最终得到的就是去重后的结果
	// 无法去重空对象
	/*
        语法: new Map([iterable]): iterable可以是一个数组或是其他的对象, 其元素为键值对(两个元素的数组). 每个键值对都会添加到新的Map. null会被当作undefined
        一个Map对象在迭代时会根据对象中元素的插入顺序来进行一个for...of循环在每次迭代后会返回一个形式为[key, value]的数组
    */
	// let map = new Map();
	// let array = new Array(); // 该数组用于返回结果
	// for (let i = 0; i < arr.length; i++) {
	// 	// Map.has(key): 返回一个布尔值, 表示Map实例是否包含键对应的值
	// 	if (map.has(arr[i])) {
	// 		// Map.set(key, value): 设置Map对象中键的值, 返回该Map对象
	// 		map.set(arr[i], true);
	// 	} else {
	// 		map.set(arr[i], false);
	// 		array.push(arr[i]);
	// 	}
	// }
	// return array

	// 利用reduce + includes
	// reduce()方法对数组中的每个元素执行一个由自己提供的reducer函数(升序执行), 将其结果汇总为单个返回值
	/*
        reduce()的参数:
            1. 一个回调函数, 数组中的每个值都会执行该函数, 该函数由4个参数
                accumulator: 累加器, 累计回调的返回值
                currentValue: 数组中正在处理的元素
                index(可选): 数组中正在处理的当前元素的索引值
                array: 调用reduce()的数组
            2. initialValue(可选): 作为第一次调用callback的函数时的第一个参数的值, 如果没有提供初始值, 则将使用数组的第一个元素. 在没有初始值的空数组上调用reduce将报错
    */
	// return arr.reduce((arr, item) => arr.includes(item) ? arr: [...arr, item], []);

	// 12 Set()方法的简写, [...arr]是ES6语法中, 这里表示展开数组
	[...new Set(arr)]
	return arr
}
console.log(unique(arr));