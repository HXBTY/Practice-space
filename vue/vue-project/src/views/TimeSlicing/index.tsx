// 时间分片渲染大数据文件 适用于简单dom
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
    setup() {
        // 数据总条数
        const total: ref<number> = ref(10000000);
        // 一次插入条数的大小
        const size: ref<number> = ref(20);
        // 当前插入位置的索引
        const index: ref<number> = ref(0);
        // ul的dom元素
        const ulDom = ref(null);
        function loop(currentTotal, currentIndex): void {
            // 如果剩余的数量小于或等于0, 则结束
            if (currentTotal <= 0) return;
            // 每页多少条
            const pageCount = Math.min(currentTotal, size.value);
            // createDocumentFragment 创建一个不属于DOM树的空文档对象, 它的变化不会触发DOM树的重新渲染
            const fragment: DocumentFragment = document.createDocumentFragment();
            // requestAnimationFrame 跟随系统刷新执行
            window.requestAnimationFrame(() => {
                for (let i = 0; i < pageCount; i++) {
                    const li:HTMLElement = document.createElement("li");
                    // li 填充任意内容
                    li.innerText = `${currentIndex + i}: ${~~(Math.random() * total.value)}`
                    fragment.appendChild(li)
                }
                ulDom.value.appendChild(fragment)
                loop(currentTotal - pageCount, currentIndex + pageCount);
            })
        }
        onMounted(() => {
            ulDom.value = document.querySelector(".ul-box")
            loop(total.value, index.value)
        })
        return () => (
            <>
                <ul ref="ulDom" class="ul-box"></ul>
            </>
        )
    }
})