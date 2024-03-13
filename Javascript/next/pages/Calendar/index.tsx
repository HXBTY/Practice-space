import "./index.css"
import React, {useEffect, useImperativeHandle, useRef, useState} from "react";

interface CalendarProps {
    value?: Date,
    onChange?: (date: Date) => void
}

interface CalendarRef {
    getDate: () => Date,
    setDate: (date: Date) => void
}

const monthName: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]

/**
 * 获取指定年月的每月天数
 * @param year
 * @param month
 */
const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
}
/**
 * 获取指定年月的每个月的第一天
 * @param year
 * @param month
 */
const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 1).getDay()
}


const InternalCalender: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
    const {
        value = new Date(),
        onChange = (date) => {}
    } = props
    const [date, setData] = useState(value)
    useImperativeHandle(ref, () => {
        return {
            getDate() {
                return date
            },
            setDate(date: Date) {
                setData(date)
            }
        }
    })
    /**
     * 切换上个月
     */
    const handlePrevMonth = () => {
        setData(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }
    /**
     * 切换下个月
     */
    const handleNextMonth = () => {
        setData(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    function renderDays() {
        const days = []
        const daysCount: number = daysOfMonth(date.getFullYear(), date.getMonth())
        const firstDay: number = firstDayOfMonth(date.getFullYear(), date.getMonth())
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>)
        }
        for (let i = 1; i <= daysCount; i++) {
            const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
            if (i === date.getDate()) {
                days.push(<div className="day select" onClick={clickHandler} key={i}>{i}</div>)
            } else {
                days.push(<div className="day" onClick={clickHandler} key={i}>{i}</div>)
            }
        }
        return days
    }


    return <div className="calendar">
        <div className="header">
            <button onClick={handlePrevMonth}>&lt;</button>
            <div>{date.getFullYear()} 年 {monthName[date.getMonth()]} 月</div>
            <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="days">
            <div className="day">日</div>
            <div className="day">一</div>
            <div className="day">二</div>
            <div className="day">三</div>
            <div className="day">四</div>
            <div className="day">五</div>
            <div className="day">六</div>
            {renderDays()}
        </div>
    </div>
}

const Calendar = React.forwardRef(InternalCalender)

function Test() {
    const calendarRef = useRef<CalendarRef>(null)
    useEffect(() => {
        setTimeout(() => {
            calendarRef.current?.setDate(new Date(2024, 3, 1))
        }, 2000)
    }, [])
    return <div>
        <Calendar ref={calendarRef} value={new Date("2024-1-1")} ></Calendar>
    </div>
}

export default Test