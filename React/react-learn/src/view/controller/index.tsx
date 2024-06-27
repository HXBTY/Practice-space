/**
 * 受控模式与非受控模式
 * 受控模式：通过代码修改表单值
 * 非受控模式：不使用代码去修改表单值
 */
import useMergeState from "./useMergeState";
import { useState } from "react";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void
}

function Calendar(props: CalendarProps) {
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  })

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={() => {setValue(new Date("2024-5-17"))}}>2024-5-17</div>
    <div onClick={() => {setValue(new Date("2024-5-18"))}}>2024-5-18</div>
    <div onClick={() => {setValue(new Date("2024-5-19"))}}>2024-5-19</div>
  </div>
}

export default function App() {
  // 受控模式
  // const [value, setValue] = useState(new Date("2024-5-17"))
  // return <Calendar value={value} onChange={(date) => {
  //   console.log(date.toLocaleDateString());
  //   setValue(date)
  // }}></Calendar>

  // 非受控模式
  return <Calendar defaultValue={new Date("2024-6-17")} onChange={(date) => {
    console.log(date);
  }} />
}