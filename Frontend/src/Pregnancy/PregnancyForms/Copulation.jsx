import { useContext } from 'react'
import DateElement from '../../Custom/DateElement'
import LanguageContext from '../../LanguageContext'

const Copulation = ({ data = {}, formSubmission }) => {
  const [lang] = useContext(LanguageContext)

  return (
    <form
      className="pregnancy-box pregnancy-box-big pregnancy-forms"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        data.date = new Date(data.date)
        if (data.bull === '') delete data.bull
        if (data.worker === '') delete data.worker
        data.stage = 'COPULATION'
        formSubmission(data)
      }}
    >
      <h2 className="heading2">{lang ? 'Copulation' : 'उठी'}</h2>
      <DateElement
        name="date"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={new Date(data.date || Date())}
        lang={lang}
      />
      <label htmlFor="bull">
        {lang ? 'Bull' : 'पड़ा'}:
        <input
          className="inputs w-20"
          type="text"
          min={0}
          defaultValue={data?.bull || ''}
          step={1}
          name="bull"
        />
      </label>
      <label htmlFor="worker my-2">
        {lang ? 'Worker' : 'कर्मचारी'}:
        <input
          type="text"
          name="worker"
          defaultValue={data?.worker || ''}
          className="inputs w-48"
        />
      </label>
      <button type="submit" className="buttons w-full min-w-fit self-center">
        {lang ? 'Submit' : 'जमा करें।'}
      </button>
    </form>
  )
}

export default Copulation
