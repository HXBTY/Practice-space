// 模板转换
const vm = require("vm");

const user = {
  name: "<script />"
};

const result = `<h2>${user.name}</h2>`;

function read() {
  let value = vm.runInNewContext('`<h2>${_(user.name)}</h2>`', {
    user,
    _: (markup) => {
      if (!markup) return "";
      return String(markup)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");
    }
  });
  return value
}

console.log(read());
