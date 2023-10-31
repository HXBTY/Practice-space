/**
 * 将字符串转换为哈希码
 * @param {string} text
 * @return {number}
 */
function changeToHash(text) {
    let hash = 0, code = "";
    for (let i = 0; i < text.length; i++) {
        code = text.charCodeAt(i);
        hash = (hash << 5) - hash + code;
        hash |= 0;
    }
    return hash;
}