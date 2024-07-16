// IntersectionObserver 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调
const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return;
  // 进行监听时的处理处理
}, {
  threshold: [0.5, 1], // 设置展示阈值，当超过设定阈值时，触发监听 number | [number]
  rootMargin: "0px 0px 0px 0px", // 设置与边界盒子的偏移位置 string
  root: null // 设置边界盒子，默认未顶级文档的视口 Element | Document | null
})
// 开始监听
const dom = document.querySelector(".app")
// 监听单个元素
intersectionObserver.observe(dom)
// 停止监听
intersectionObserver.disconnect()
// 返回所观察目标的对象数组
intersectionObserver.takeRecords()
// 停止指定dom的监听
intersectionObserver.unobserve(dom)
