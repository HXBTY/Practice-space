import React, {Suspense} from "react";
import {atom, useAtom} from "jotai"; // jotai 也可以搭配 Suspense 使用

/**
 * suspense 体验
 * suspense 通常与 React.lazy 一起使用
 * suspense 原理：接收的是一个 throw 出来的 promise
 */
const LazyAaa = React.lazy(() => import('./test'))
const userAtom = atom(async (get) => {
    const userId = 1
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`
    )
    return response.json()
})
const UserName = () => {
    const [user] = useAtom(userAtom)
    return <div>User.name: {user.name}</div>
}
export default function App() {
    return <div>
        <Suspense fallback={<div>loading...</div>}>
            <LazyAaa></LazyAaa>
            <UserName />
        </Suspense>
    </div>
}

