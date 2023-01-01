import { useContext, useState } from 'react'
import LanguageContext from '../../LanguageContext'
import SelectElement from '../../Custom/SelectElement'
import DateElement from '../../Custom/DateElement'

const Examination = ({ data = {}, lastStageDate, formSubmission }) => {
  // Language
  const [lang] = useContext(LanguageContext)

  // Duration
  const [duration, setDuration] = useState(0)
  const [isPregnant, setIsPregnant] = useState(null)
  if (!data.date && lastStageDate) {
    const someDate = new Date(lastStageDate)
    someDate.setDate(someDate.getDate() + 3 * 30)
    data.date = someDate
  }

  const onDateChange = (date) => {
    if (!lastStageDate) return
    if (typeof lastStageDate === 'string')
      lastStageDate = new Date(lastStageDate)

    const months =
      12 * (date.getFullYear() - lastStageDate.getFullYear()) +
      date.getMonth() -
      lastStageDate.getMonth() +
      0
    // 2 * Math.round(Math.abs(lastStageDate.getDate() - date.getDate()) / 15)
    setDuration(months)
  }

  return (
    <form
      className="pregnancy-box pregnancy-box-big pregnancy-forms"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        data.date = new Date(data.date)
        data.isPregnant = data.isPregnant === 'true'
        data.stage = 'EXAMINATION'
        if (data.duration) {
          data.duration = Number(data.duration)
        }
        formSubmission(data)
      }}
    >
      <h2 className="heading2">Test</h2>
      <DateElement
        name="date"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={new Date(data.date || Date())}
        onChange={onDateChange}
        lang={lang}
      />
      <label htmlFor="doctor">
        {lang ? 'Doctor' : 'डॉक्टर'}:
        <input
          type="text"
          name="doctor"
          className="inputs w-3/5 max-w-[48]"
          required={true}
          defaultValue={data.doctor}
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
        defaultValue={data?.isPregnant || ''}
        label={lang ? 'Pregnant:' : 'क्या pregnant है?'}
        className="inputs max-w-30 min-w-fit"
        onChange={setIsPregnant}
        required={true}
      />
      {isPregnant ? (
        <label htmlFor="duration">
          {lang ? 'Duration' : 'समय'}:
          <input
            name="duration"
            type="number"
            step={0.5}
            defaultValue={duration}
            className="inputs w-20"
          />
          <span className="rounded-xl py-2 px-2 font-bold text-red1">
            {lang ? 'Months' : 'महीने'}
          </span>
        </label>
      ) : null}
      {isPregnant ?? true ? null : (
        <label htmlFor="reason">
          Comment <input name="reason" type="text" className="inputs w-20" />
        </label>
      )}
      <div className="text-center">
        <button type="submit" className="buttons min-w-fit">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
      </div>
    </form>
  )
}

export default Examination
