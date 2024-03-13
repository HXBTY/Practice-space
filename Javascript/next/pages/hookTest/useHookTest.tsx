/**
 * 在react中只要涉及到对象内部元素修改的，必须返回一个新的对象
 */
import {useState, useEffect, useLayoutEffect, useReducer, Reducer, useRef} from "react";

async function queryData() {
    return await new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(1)
        }, 500)
    })
}

/**
 * userState 返回一个数组，包含state与setXXX的spi，通常使用结构语法获取
 * 只能用于同步逻辑，不能用于异步
 */
function stateTest() {
    /**
     * setXXX 有两种传值
     * 直接传入一个新的值 setNmu(num + 1)
     * 传入一个函数，返回一个新的值 setNum(preNmu => preNum + 1)
     * <div onClick={() => setNum(num + 1)}>{num}</div>
     */
    const [num, setNum] = useState(0)
    return <div>
        <span>useState: </span>
        <span onClick={() => setNum(preNum => preNum + 1)}>{num}</span>
    </div>

}

/**
 * useEffect 支持异步
 * 第一个参数是一个函数，queryData 需要单独写成一个函数，因为useEffect的参数，不能是一个异步函数
 * useEffect的第二个参数是一个数组（依赖数组），react根据它来决定是否执行effect函数，
 *  - 如果没传，则每次都执行，如果传了，则只执行一次
 *  - 可以通过改变数组中的值，来执行effect函数
 */
function effectTest() {
    const [effectNum, setEffectNum] = useState(0)
    useEffect(() => {
        queryData().then(res => {
            setEffectNum(res)
        })
    }, []);
    return <div>
        <span>useEffect: </span>
        <span
            onClick={() => setEffectNum(effectNum + 1)}>{effectNum}</span>
    </div>
}

/**
 * useLayoutEffect 与 useEffect 基本一样
 * 区别在于他们两个的执行顺序
 *  useEffect 的执行在操作dom之后异步执行，但是由于react的渲染时间间隔是固定的，会有两种情况①渲染前执行，②渲染后执行，因此可能会出现页面善动的问题
 *  useLayoutEffect 的会在操作dom之后同步执行，因此会在页面渲染之前执行，则不会有闪动问题，但是如果effect阻塞了，则会导致渲染阻塞，因此大部分时候还是使用 useEffect
 */
function layoutEffectTest() {
    const [layoutEffectNum, setLayoutEffectNum] = useState(0)
    useLayoutEffect(() => {
        queryData().then(res => {
            setLayoutEffectNum(res)
        })
    }, []);
    return <div>
        <span>useLayoutEffect: </span>
        <span onClick={() => setLayoutEffectNum(layoutEffectNum + 1)}>{layoutEffectNum}</span>
    </div>
}

interface Data {
    result: number
}

interface Action {
    type: 'add' | 'minus',
    num: number
}

/**
 * @description userReducer 的行为函数 每次修改返回的必须是一个新的对象，直接修改原始对象内部的值，是无法使用的
 * @param state
 * @param action
 */
function reducer(state: Data, action: Action) {
    switch (action.type) {
        case 'add':
            return {
                result: state.result + action.num
            }
        case "minus":
            return {
                result: state.result - action.num
            }
        default:
            return state
    }
}

/**
 * useReducer 的类型参数传入 Reducer<数据的类型， action的类型>
 * 第一个参数是 reducer，第二个参数是初始数据
 * 用于封装一个固定的操作，执行时通过action触发
 * 也可以通过第二种重载的使用方式，使用函数来创建初始值，这时第二个参数则变成了传入函数的参数
 */
function reducerTest() {
    // const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {result: 1})
    const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(reducer, 'zero', param => {
        return {
            result: param === 'zero' ? 0 : 1
        }
    })
    return <div>
        <span>userReducer: </span>
        <div>
            <div onClick={() => dispatch({type: 'add', num: 1})}>加一</div>
            <div onClick={() => dispatch({type: 'minus', num: 2})}>减二</div>
            <div>{res.result}</div>
        </div>
    </div>
}


/**
 * useRef 的参数类型是其所保存内容的类型
 * ref的内容保存至 current 上
 * 一般用来存放一些不用于渲染的内容
 */
function refTest() {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        // 自动获取焦点
        inputRef.current?.focus()
    }, []);
    return <div>
        <span>useRef: </span>
        <input ref={inputRef} type="text"/>
    </div>
}

export default function useHookTest() {
    return <>
        {stateTest()}
        {effectTest()}
        {layoutEffectTest()}
        {reducerTest()}
        {refTest()}
    </>
}