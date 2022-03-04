import { useState } from 'react'
import DateElement from '../DateElement'

const CopulationForm = ({ info }) => {
  const [bullNumber, setBullNumber] = useState(info?.bullNumber || '')
  const [worker, setWorker] = useState(info?.worker || '')

  return (
    <div className="pregnancy-box pregnancy-box-big">
      <h2 className="heading2">Uthi</h2>
      <DateElement
        name="uthiDate"
        label="Date:"
        defaultValue={info?.uthiDate}
      />
      <label htmlFor="bullNumber">
        BullNumber:
        <input
          className="inputs w-20"
          type="number"
          value={bullNumber}
          onChange={(e) => {
            setBullNumber(e.target.value)
          }}
          min={0}
          step={1}
          name="bullNumber"
        />
      </label>
      <label htmlFor="worker my-2">
        Worker:
        <input
          type="text"
          value={worker}
          onChange={({ target }) => setWorker(target.value)}
          name="worker"
          className="inputs w-48"
        />
      </label>
    </div>
  )
}

export default CopulationForm
