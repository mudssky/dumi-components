import clsx from 'clsx'
import React, { useImperativeHandle, useState } from 'react'
import './index.css'

// 一到十二月
const monthNames = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

const daysOfMonth = (year: number, month: number) => {
  // new Date day传0时为上个月最后一天，-1为倒数第二天 以此类推
  // getDate获取日数。最后一天的日数也就是当月的天数
  return new Date(year, month + 1, 0).getDate()
}

const firstDayOfMonth = (year: number, month: number) => {
  // 获取当月第一天的星期
  return new Date(year, month, 1).getDay()
}

interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
}

interface CalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const InternalMiniCalendar: React.ForwardRefRenderFunction<
  CalendarRef,
  CalendarProps
> = (props, ref) => {
  const { value = new Date(), onChange } = props
  const [date, setDate] = useState(value)
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }
  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date
      },
      setDate(date) {
        setDate(date)
      },
    }
  })
  const renderDays = () => {
    const days = []

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    //
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    const lastMonthDaysCount = daysOfMonth(
      date.getFullYear(),
      date.getMonth() - 1,
    )
    // 1号不是周日的情况下前面需要填充上个月的
    for (let i = 0; i < firstDay; i++) {
      const graydate = lastMonthDaysCount - (firstDay - i - 1)
      days.push(
        <div
          key={`gray-${i}`}
          className="day gray"
          onClick={() =>
            onChange?.(
              new Date(date.getFullYear(), date.getMonth() - 1, graydate),
            )
          }
        >
          {graydate}
        </div>,
      )
    }

    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div
          key={i}
          className={clsx('day', i === date.getDate() ? 'selected' : '')}
          onClick={() =>
            onChange?.(new Date(date.getFullYear(), date.getMonth(), i))
          }
        >
          {i}
        </div>,
      )
    }

    const leftDays = 42 - days.length
    for (let i = 1; i <= leftDays; i++) {
      const grayDate = i
      days.push(
        <div
          key={`gray-${42 - i}`}
          className="day gray"
          onClick={() =>
            onChange?.(
              new Date(date.getFullYear(), date.getMonth() + 1, grayDate),
            )
          }
        >
          {new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            grayDate,
          ).getDate()}
        </div>,
      )
    }
    return days
  }
  return (
    <div className="mini-calendar">
      <div className="header">
        <button onClick={handlePrevMonth} type="button">
          &lt;
        </button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth} type="button">
          &gt;
        </button>
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
        {/* <div className="empty"></div>
        <div className="empty"></div>
        <div className="day">1</div>
        <div className="day">2</div>
        <div className="day">3</div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>
        <div className="day">7</div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day">11</div>
        <div className="day">12</div>
        <div className="day">13</div>
        <div className="day">14</div>
        <div className="day">15</div>
        <div className="day">16</div>
        <div className="day">17</div>
        <div className="day">18</div>
        <div className="day">19</div>
        <div className="day">20</div>
        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day">23</div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>
        <div className="day">28</div>
        <div className="day">29</div>
        <div className="day">30</div>
        <div className="day">31</div> */}
      </div>
    </div>
  )
}

const MiniCalendar = React.forwardRef(InternalMiniCalendar)
export default MiniCalendar
