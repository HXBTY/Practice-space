import React, {useEffect, useImperativeHandle, useRef} from "react";

interface RefProps {
    handleFocus: () => void
}

/**
 * 若是想要从子元素向父元素传递ref，就需要使用 forwardRef，即将组件内的ref进行转发
 * 若是使用 forwardRef，那么子元素就需要使用 React.forwardRefRenderFunction 去进行创建
 * 第一个参数是的类型是ref的 content 的类型，第二个参数是 props 的类型
 */
const Child: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
    const interRef = useRef<HTMLInputElement>(null)
    /**
     * 如果不想将原生标签暴露出去，就可以使用 useImperativeHandle 重定义ref对象
     * 第一个参数 传入的 ref
     * 第二个参数 返回新的 ref 的值
     * 第三个参数 依赖数组
     */
    useImperativeHandle(ref, () => {
        return {
            handleFocus() {
                interRef.current?.focus()
            }
        }
    }, [interRef])
    return <div>
        <input type="text" ref={interRef}/>
    </div>
}

const WardedChild = React.forwardRef(Child)

function App() {
    const ref = useRef<RefProps>(null)
    useEffect(() => {
        ref.current?.handleFocus()
    }, []);
    return <div>
        <WardedChild ref={ref} />
    </div>
}
export default App