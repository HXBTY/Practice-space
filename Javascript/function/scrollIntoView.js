/**
 * Element.scrollIntoView
 * 使Element滚动到视图顶部/底部
 */
const element = document.querySelector("div")

// 第一种使用方式
element.scrollIntoView();

/**
 * 第二种
 * @param {boolean}
 * true: 相当于 { block: "start", inline: "nearest"}
 * false: 相当于 { block: "end", inline: "nearest" }
 */
element.scrollIntoView(true)

element.scrollIntoView({
    behavior: "smooth", // 滚动的效果 平滑/立即/自动 smooth/instant/auto
    block: "end", // y轴滚动条对其位置 start/center/end/nearest 默认start
    inline: "start", // x轴滚动条 start/center/end/nearest 默认为nearest
})