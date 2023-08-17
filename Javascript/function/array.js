// 判断数组a是等于数组b
const arrayA= [1,2,3,4,5,6,7];
const arrayB= [1,2,3,4,5,6,7];
const result = arrayA.filter(item => arrayB.includes(item)).length === arrayB.length;
console.log(result)