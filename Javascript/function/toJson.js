/**
 * @description 根据传入的json，与默认值转换为一个json形式数据
 * @param rule
 * @param defVal
 * @param init
 * @return {T|any}
 */
function toData(rule, defVal, init) {
    const copy = val => JSON.parse(JSON.stringify(val));
    const initial = init ?? copy(defVal[rule.type]);
    return rule.children ? rule.children.reduce((res, v) => {
        if (Array.isArray(res)) res.push(toData(v, defVal));
        else if ({}.toString.call(res) === '[object Object]') toData(v, defVal, res[v.propertyName] = copy(defVal[v.type]))
        return res;
    }, initial) : initial;
}

const result = toData({
    "type": "object", "propertyName": "user", "children": [{
        "type": "string", "propertyName": "name", "children": null
    }, {
        "type": "int", "propertyName": "age", "children": null,

    }, {
        "type": "array", "propertyName": "data", "children": [{
            "type": "object", "name": "name", "children": null
        }]
    }]
}, {
    string: "默认值", int: 1, float: 0.1, double: 10.34, boolean: false, array: [], object: {},
})