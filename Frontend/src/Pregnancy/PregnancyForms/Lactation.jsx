import { useContext } from 'react'
import DateElement from '../../Custom/DateElement'
import LanguageContext from '../../LanguageContext'

const Lactation = ({ lastStageDate, data = {}, formSubmission }) => {
  const [lang] = useContext(LanguageContext)

  if (!Object.keys(data).length && lastStageDate) {
    const tempStage = new Date(lastStageDate)
    tempStage.setMonth(tempStage.getMonth() + 2)
    data.date = tempStage
  } else if (data.date) {
    data.date = new Date(data.date)
  }

  return (
    <form
      className="pregnancy-box pregnancy-box-small pregnancy-forms"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formSubmission({
          date: new Date(formData.get('date')),
          stage: 'LACTATION',
        })
      }}
    >
      <h2 className="heading2">{lang ? 'Lactation' : 'छुटाई'}</h2>
      <DateElement
        name="date"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={data?.date || new Date()}
        lang={lang}
      />
        <button type="submit" className="buttons min-w-fit self-center w-full">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
    </form>
  )
}

export default Lactation
