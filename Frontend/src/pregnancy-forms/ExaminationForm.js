import { useState } from 'react'
import DateElement from '../DateElement'
import SelectElement from '../SelectElement'

const ExaminationForm = ({ info }) => {
  const [doctor, setDoctor] = useState(info?.doctor || '')
  const [duration, setDuration] = useState(info?.duration || '')

  return (
    <div className="pregnancy-box pregnancy-box-big">
      <h2 className="heading2">Test</h2>
      <DateElement name="testDate" label="Date:" defaultValue={info?.date} />
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
      <SelectElement
        options={[
          ['No', false],
          ['Yes', true],
        ]}
        name="isPregnant"
        defaultValue={info?.isPregnant || ''}
        label="Pregnant:"
        className="inputs w-20"
      />
      <label htmlFor="duration">
        Duration:
        <input
          name="duration"
          type="number"
          step={0.5}
          value={duration}
          onChange={({ target }) => setDuration(target.value)}
          className="inputs w-20"
        />
      </label>
    </div>
  )
}

export default ExaminationForm
