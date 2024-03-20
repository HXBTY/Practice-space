import dayjs, {Dayjs} from "dayjs";
import React, {CSSProperties, ReactNode, useState} from "react";
import cs from "classnames";
import LocaleContext from "@/pages/Calendar/LocaleContext";
import Header from "@/pages/Calendar/Header";
import MonthCalender from "@/pages/Calendar/MonthCalender";

export interface CalendarProps {
    value: Dayjs
    style?: CSSProperties
    className?: string | string[]
    // 定制日期显示
    dateRender?: (currentDate: Dayjs) => ReactNode
    // 定制日期单元格
    dateInnerContent?: (currentDate: Dayjs) => ReactNode
    // 国际化相关
    locale?: string
    onChange?: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
    const {
        value,
        style,
        className,
        locale,
        onChange
    } = props
    const [curValue, setCurValue] = useState<Dayjs>(value)
    const classNames = cs("calendar", className)
    const [curMonth, setCurMonth] = useState<Dayjs>(value)
    function changeDate(date: Dayjs) {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }
    function selectHandler(date: Dayjs) {
        changeDate(date)
    }
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, "month"))
    }
    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, "month"))
    }
    function todayHandler() {
        const date = dayjs(Date.now())
        changeDate(date)
    }
    return <LocaleContext.Provider value={{locale: locale || navigator.language}}>
        <div className={classNames} style={style}>
            <Header curMonth={curMonth} nextMonthHandler={prevMonthHandler} prevMonthHandler={nextMonthHandler} todayHandler={todayHandler}></Header>
            {/*需要单独添加的属性放到props后面添加，避免被覆盖*/}
            <MonthCalender {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler}/>
        </div>
    </LocaleContext.Provider>

}

export default Calendar