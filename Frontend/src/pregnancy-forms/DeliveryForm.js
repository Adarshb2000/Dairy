import { useState } from 'react'
import DateElement from '../DateElement'
import SelectElement from '../SelectElement'

const DeliveryForm = () => {
  const [number, setNumber] = useState(0)

  return (
    <div className="pregnancy-box h-64 sm:h-48">
      <h2 className="heading2">Delivery</h2>
      <label htmlFor="number">
        Number:
        <input
          min={0}
          step={1}
          type="number"
          name="number"
          value={number}
          onChange={({ target }) => setNumber(target.value)}
          className="inputs w-20"
        />
      </label>
      <DateElement name="deliveryDate" label="Date:" className="inputs w-20" />
      <SelectElement
        name="gender"
        options={[
          ['Padiya', 'female'],
          ['Pada', 'male'],
        ]}
        defaultValue=""
        label={'Gender:'}
        className="inputs w-20"
      />
    </div>
  )
}

export default DeliveryForm
