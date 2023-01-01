import { useContext, useState } from 'react'
import DateElement from '../DateElement'
import LanguageContext from '../LanguageContext'
import SelectElement from '../SelectElement'

const ExaminationForm = ({ info, copulationDate }) => {
  // Language
  const [lang, _] = useContext(LanguageContext)

  // Form
  const [doctor, setDoctor] = useState(info?.doctor || '')
  const [duration, setDuration] = useState(info?.duration || '')

  // Duration
  const [durationDisplay, setDurationDisplay] = useState(true)
  const durationChange = (temp) => setDurationDisplay(!temp)

  const onDateChange = (date) => {
    if (!copulationDate) return
    if (typeof copulationDate === 'string')
      copulationDate = new Date(copulationDate)

    const months =
      12 * (date.getFullYear() - copulationDate.getFullYear()) +
      date.getMonth() -
      copulationDate.getMonth() +
      0
    // 2 * Math.round(Math.abs(copulationDate.getDate() - date.getDate()) / 15)
    setDuration(months)
  }

  return (
    <div className="pregnancy-box pregnancy-box-big pregnancy-forms">
      <h2 className="heading2">Test</h2>
      <DateElement
        name="testDate"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={info?.date}
        onChange={onDateChange}
        lang={lang}
      />
      <label htmlFor="doctor">
        {lang ? 'Doctor' : 'डॉक्टर'}:
        <input
          type="text"
          value={doctor}
          onChange={({ target }) => setDoctor(target.value)}
          name="doctor"
          className="inputs max-w-[48] w-3/5"
        />
      </label>
      <SelectElement
        options={
          lang
            ? [
                ['No', false],
                ['Yes', true],
              ]
            : [
                ['नहीं', false],
                ['हां', true],
              ]
        }
        name="isPregnant"
        defaultValue={info?.isPregnant || ''}
        label={lang ? 'Pregnant:' : 'क्या pregnant है?'}
        className="inputs min-w-fit max-w-30"
        onChange={durationChange}
      />
      <label htmlFor="duration" hidden={durationDisplay}>
        {lang ? 'Duration' : 'समय'}:
        <input
          name="duration"
          type="number"
          step={0.5}
          value={duration}
          onChange={({ target }) => setDuration(target.value)}
          className="inputs w-20"
        />
        <span className="font-bold py-2 px-2 rounded-xl text-red1">
          {lang ? 'Months' : 'महीने'}
        </span>
      </label>
    </div>
  )
}

export default ExaminationForm
