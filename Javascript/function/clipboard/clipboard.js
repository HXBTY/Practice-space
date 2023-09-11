// 复制内容到剪贴板
function execCommand(value) {
    const textarea = document.createElement("input");
    textarea.setAttribute("value", value);
    document.body.appendChild(textarea);
    textarea.select()
    window.getSelection().toString();
    document.execCommand("copy", true); // execCommand 目前兼容度最好，但是即将被弃用
    document.body.removeChild(textarea);
}

function writeText(value) {
    navigator.clipboard.writeText(value).then(() => {
        console.log("复制成功");
    }).catch(error => {
        console.log("复制失败");
        console.error(error);
    })
}
