import { useState } from 'react'
import DateElement from '../DateElement'
import SelectElement from '../SelectElement'

const DeliveryForm = ({ info }) => {
  const [number, setNumber] = useState(info?.number || '')

  return (
    <div className="pregnancy-box pregnancy-box-big">
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
      <DateElement
        name="deliveryDate"
        label="Date:"
        defaultValue={info?.deliveryDate}
      />
      <SelectElement
        name="gender"
        options={[
          ['Padiya', 'female'],
          ['Pada', 'male'],
        ]}
        defaultValue={info?.gender || ''}
        label="Gender:"
        className="inputs w-20"
      />
    </div>
  )
}

export default DeliveryForm
