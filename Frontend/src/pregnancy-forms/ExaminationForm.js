import { useState } from 'react'
import DateElement from '../DateElement'
import SelectElement from '../SelectElement'

const ExaminationForm = () => {
  const [doctor, setDoctor] = useState()

  return (
    <div className="pregnancy-box pregnancy-box-big">
      <h2 className="heading2">Test</h2>
      <DateElement name="testDate" label="Date:" />
      <SelectElement
        options={[
          ['No', false],
          ['Yes', true],
        ]}
        name="isPregnant"
        defaultValue=""
        label="Pregnant:"
        className="inputs w-20"
      />
      <label htmlFor="doctor">
        Doctor:
        <input
          type="text"
          value={doctor}
          onChange={({ target }) => setDoctor(target.value)}
          name="doctor"
          className="inputs w-48"
        />
      </label>
    </div>
  )
}

export default ExaminationForm
