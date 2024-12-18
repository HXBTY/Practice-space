import "./index.scss"
import {CalendarProps} from "./Calendar";
import {Dayjs} from "dayjs";
import {useContext} from "react";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import cs from "classnames";

interface MonthCalendarProps extends CalendarProps {
    curMonth: Dayjs
    selectHandler?: (date: Dayjs) => void
}

function getAllDays(date: Dayjs) {
    const daysInMonth = date.daysInMonth() // 获取当月的天数
    const startDate = date.startOf("month") // 获取对应月份的第一天
    const day = startDate.day() // 获取对应月份第一天是周几
    const daysInfo: Array<{ date: Dayjs, currentMonth: boolean }> = new Array(6 * 7) // 日历尺寸，固定6*7
    // 获取当月第一天的前几天，补全当周
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            date: startDate.subtract(day - i, "day"),
            currentMonth: false
        }
    }
    for (let i = day; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day');
        daysInfo[i] = {
            date: startDate.add(i - day, "day"),
            currentMonth: calcDate.month() === date.month()
        }
    }
    return daysInfo
}

function renderDays(
    days: Array<{ date: Dayjs, currentMonth: boolean }>,
    dateRender: MonthCalendarProps['dateRender'],
    dateInnerContent: MonthCalendarProps['dateInnerContent'],
    value: Dayjs,
    selectHandler: MonthCalendarProps["selectHandler"]) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            row[j] = <div className={
                "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')
            } onClick={() => selectHandler?.(item.date)}>{dateRender ? dateRender(item.date) : (
                <div className="calendar-month-body-cell-date">
                    <div className={
                        cs("calendar-month-body-cell-date-value",
                            value.format("YYYY-MM-DD") === item.date.format("YYYY-MM-DD")
                                ? "calendar-month-body-cell-date-selected"
                                : "")
                    }>{item.date.date()}</div>
                    <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
                </div>
            )}</div>
        }
        rows.push(row);
    }
    return rows.map((row) => <div className="calendar-month-body-row">{row}</div>)
}

function MonthCalender(props: MonthCalendarProps) {
    const localeContext = useContext(LocaleContext)
    const CalendarLocale = allLocales[localeContext.locale]
    const {
        value,
        curMonth,
        dateRender,
        dateInnerContent,
        selectHandler,
    } = props
    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const allDays = getAllDays(curMonth)
    return <div className="calendar-month">
        <div className="calendar-month-week-list">
            {
                weekList.map(week => (
                    <div className="calendar-month-week-list-item" key={week}>{CalendarLocale.week[week]}</div>
                ))
            }
        </div>
        <div className="calendar-month-body">
            {renderDays(allDays, dateRender, dateInnerContent, value, selectHandler)}
        </div>
    </div>
}

export default MonthCalender