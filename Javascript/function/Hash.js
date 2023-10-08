const crypto = require('crypto');

/**
 * 将一串字符串转换为哈希码
 * @param text {string}
 * @return {Promise<ArrayBuffer>}
 */
function generateHash(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}
const hash = generateHash("测试康康");

console.log(hash);  // 输出哈希码