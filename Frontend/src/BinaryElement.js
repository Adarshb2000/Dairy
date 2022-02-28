import { useState } from 'react'

const BinaryElement = ({
  name,
  options,
  defaultValue = false,
  classes = ['checkbox-0', 'checkbox-1'],
}) => {
  const [checked, setChecked] = useState(defaultValue)
  return (
    <div
      className={!checked ? classes[0] : classes[1]}
      onClick={() => setChecked(!checked)}
    >
      {options.length === 1
        ? options[0].toUpperCase()
        : checked
        ? options[1].toUpperCase()
        : options[0].toUpperCase()}
      <input
        name={name}
        type="checkbox"
        hidden
        onChange={() => {}}
        checked={checked}
      />
    </div>
  )
}

export default BinaryElement
