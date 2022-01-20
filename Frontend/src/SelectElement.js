import { useState } from 'react'

const SelectElement = ({ name, options, label, defaultValue = null }) => {
  const [variable, setVariable] = useState(defaultValue)

  return (
    <div>
      <label>
        {label}
        <input
          name={name}
          type="bool"
          hidden
          value={variable}
          onChange={() => {}}
        />
        <select
          name={name}
          onChange={({ target }) => setVariable(target.value)}
          onBlur={({ target }) => setVariable(target.value)}
          value={variable}
        >
          <option value="" disabled>
            Select
          </option>
          {options.map(([option, value], index) => (
            <option key={index} value={value}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SelectElement
