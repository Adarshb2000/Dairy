import { useState } from 'react'
import DateElement from '../DateElement'

const CopulationForm = () => {
  const [bullNumber, setBullNumber] = useState()
  const [worker, setWorker] = useState()

  return (
    <div className="pregnancy-box h-72 sm:h-60">
      <h2 className="heading2">Uthi</h2>
      <DateElement name="uthiDate" label="Date:" className="inputs w-20" />
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
      <label htmlFor="worker">
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
