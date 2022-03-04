import { useState } from 'react'

const DateElement = ({
  label,
  name,
  className = 'inputs max-w-fit max-h-fit min-w-fit',
  defaultValue = null,
}) => {
  const currYear = new Date().getFullYear()
  const years = Array.from({ length: currYear - 2000 + 1 }).map(
    (_, index) => currYear - index
  )
  const [day, setDay] = useState(defaultValue?.getDate() || '')
  const [month, setMonth] = useState(defaultValue?.getMonth() + 1 || '')
  const [year, setYear] = useState(defaultValue?.getFullYear() || '')
  const days = Array.from({ length: 31 }).map((_, index) => index + 1)
  const months = Array.from({ length: 12 }).map(
    (_, index) =>
      new Date(0, index).toLocaleString('en', { month: 'long' }) +
      ' (' +
      String(index + 1) +
      ')'
  )
  const [date, setDate] = useState(
    defaultValue?.toISOString().split('T')[0] || ''
  )

  const onDateChange = () => {
    setDate(new Date(year, month - 1, day, 5, 30).toISOString().split('T')[0])
  }

  return (
    <div className="datebox">
      <label>{label}</label>
      {/* <div> */}
      <select
        id="day"
        name="Day"
        onChange={(e) => {
          setDay(e.target.value)
          onDateChange()
        }}
        onBlur={(e) => {
          setDay(e.target.value)
          onDateChange()
        }}
        className={className}
        value={day}
      >
        <option value={''} disabled>
          Day
        </option>
        {days.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          )
        })}
      </select>
      <select
        id="month"
        name="Month"
        onChange={(e) => {
          setMonth(e.target.value)
          onDateChange()
        }}
        onBlur={(e) => {
          setMonth(e.target.value)
          onDateChange()
        }}
        className={className}
        value={month}
      >
        <option value="" disabled>
          Month
        </option>
        {months.map((value, index) => {
          return (
            <option key={index} value={index + 1}>
              {value}
            </option>
          )
        })}
      </select>
      <select
        id="year"
        name="Year"
        onChange={(e) => {
          setYear(e.target.value)
          onDateChange()
        }}
        onBlur={(e) => {
          setYear(e.target.value)
          onDateChange()
        }}
        className={className}
        value={year}
      >
        <option value="" disabled>
          Year
        </option>
        {years.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          )
        })}
      </select>
      <input onChange={() => {}} name={name} value={date} hidden type="date" />
      {/* </div> */}
    </div>
  )
}

export default DateElement
