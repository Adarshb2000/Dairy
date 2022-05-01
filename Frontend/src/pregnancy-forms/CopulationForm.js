import { useContext, useState } from 'react'
import DateElement from '../DateElement'
import LanguageContext from '../LanguageContext'

const CopulationForm = ({ info }) => {
  const [bullNumber, setBullNumber] = useState(info?.bullNumber || '')
  const [worker, setWorker] = useState(info?.worker || '')
  const [lang, _] = useContext(LanguageContext)

  return (
    <div className="pregnancy-box pregnancy-box-big pregnancy-forms">
      <h2 className="heading2">{lang ? 'Copulation' : 'उथि'}</h2>
      <DateElement
        name="uthiDate"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={info?.date}
        lang={lang}
      />
      <label htmlFor="bullNumber">
        {lang ? 'BullNumber' : 'बैल संख्या'}:
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
        {lang ? 'Worker' : 'कर्मचारी'}:
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
