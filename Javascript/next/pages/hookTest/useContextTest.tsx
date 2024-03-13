import {useContext, createContext, Component} from "react";

/**
 * 跨层级组件数据传递
 * 通过 createContext 初始化创建值， 在Aaa使用 xxxContext.Provider 修改它的值，然后在Ccc中使用 userContext 获取值
 * 如果是类组件，则使用 xxxContext.Consumer 来获取值
 * 使用 createContext 创建的 context 对象，使用 Provide 修改值，
 *  -- 函数组件通过 userContext 获取值
 *  -- 类组件使用 Consumer 获取值
 */
const countContext = createContext(111)

function Aaa() {
    return <div>
        <countContext.Provider value={123}>
            <Bbb></Bbb>
        </countContext.Provider>
        <countContext.Provider value={321}>
            <countContext.Consumer>
                {
                    count => <Ddd count={count}></Ddd>
                }
            </countContext.Consumer>
        </countContext.Provider>
    </div>
}

function Bbb() {
    return <div>
        <Ccc></Ccc>
    </div>
}

function Ccc() {
    const count = useContext(countContext)
    return <div>
        context的值为: {count}
    </div>
}

class Ddd extends Component<any, any> {
    render() {
        return <div>
            context的值为: {this.props.count}
        </div>
    }
}

export default Aaa