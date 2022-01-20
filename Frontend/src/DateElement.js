import { useState } from 'react'

const DateElement = (props) => {
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(1969)
  const days = Array.from({ length: 31 }).map((val, index) => index + 1)
  const months = Array.from({ length: 12 }).map((val, index) =>
    new Date(0, index).toLocaleString('en', { month: 'long' })
  )
  const currYear = new Date().getFullYear()
  const years = Array.from({ length: currYear - 2000 + 1 }).map(
    (val, index) => currYear - index
  )

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const onDateChange = () => {
    setDate(new Date(year, month - 1, day, 5, 30).toISOString().split('T')[0])
  }

  return (
    <div>
      <label>
        {' '}
        {props.label} &nbsp;
        <label>
          Day
          <select
            id="day"
            name="Day"
            defaultValue={null}
            onChange={(e) => {
              setDay(e.target.value)
              onDateChange()
            }}
            onBlur={(e) => {
              setDay(e.target.value)
              onDateChange()
            }}
          >
            <option defaultValue={true} disabled>
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
        </label>
        <label>
          Month
          <select
            id="month"
            name="Month"
            defaultValue={null}
            onChange={(e) => {
              setMonth(e.target.value)
              onDateChange()
            }}
            onBlur={(e) => {
              setMonth(e.target.value)
              onDateChange()
            }}
          >
            <option defaultValue={true} disabled>
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
        </label>
        <label>
          Year
          <select
            id="year"
            name="Year"
            defaultValue={null}
            onChange={(e) => {
              setYear(e.target.value)
              onDateChange()
            }}
            onBlur={(e) => {
              setYear(e.target.value)
              onDateChange()
            }}
          >
            <option defaultValue={true} disabled>
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
        </label>
        <input
          onChange={() => {}}
          name={props.name}
          value={date}
          hidden
          type="date"
        />
      </label>
    </div>
  )
}

export default DateElement
