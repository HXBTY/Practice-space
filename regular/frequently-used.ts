// 匹配换行符正则
const lineBreakReg: RegExp = /\r\n|(?<!\r\n)\n(?!\r\n)|(?<!\r\n|\n)\r(?!\r\n|\n)/;
// 匹配自然数
const integerReg: RegExp = /^[0-9]+$/;