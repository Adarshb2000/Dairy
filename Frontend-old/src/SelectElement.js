import { useContext, useState } from 'react'
import LanguageContext from './LanguageContext'

const SelectElement = ({
  name,
  options,
  label,
  defaultValue = '',
  className = '',
  required = false,
  onChange = () => {},
}) => {
  const [variable, setVariable] = useState(defaultValue)
  const [lang, _] = useContext(LanguageContext)

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
          onChange={({ target }) => {
            setVariable(target.value)
            onChange('true' === target.value)
          }}
          onBlur={({ target }) => setVariable(target.value)}
          value={variable}
          className={className}
          required={required}
        >
          <option value="" disabled>
            {lang ? 'Select' : 'चयन करें'}
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
