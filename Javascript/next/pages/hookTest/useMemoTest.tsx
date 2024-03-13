import {memo, useEffect, useState, useCallback, useMemo} from "react";

/**
 * memo 的作用是，只有 props 发生改变时，才会触发组件变变化
 * 如果子组件使用了 memo，那它传递的 props 就需要使用 useMemo，useCallback 包裹，否则每次 props 都会变，那么memo就没用了
 * 反之，如果 props 使用 useMemo，useCallback，但是子组件没有倍 memo 包裹，那也是没有意义的，因为不管 props 变不变，都会重新渲染
 * useMemo 也可用来单独缓存值，userMemo 存的只会是值
 */
function Aaa() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setCount(Math.random())
        }, 2000)
    }, []);
    const BbbCallback = useCallback(function () {
        
    }, [])
    const count1 = useMemo(() => {
        return count * 10
    }, [count])
    return <div>
        <MemoBbb count={count1} callback={BbbCallback}></MemoBbb>
    </div>
}

interface BbbProps {
    count: number,
    callback: Function
}

function Bbb(props: BbbProps) {
    console.log("Bbb is render")
    return <div>
        {props.count}
    </div>
}

const MemoBbb = memo(Bbb)

export default Aaa