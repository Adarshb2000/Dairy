import { useContext } from 'react'
import DateElement from '../DateElement'
import LanguageContext from '../LanguageContext'

const LactationForm = ({ info }) => {
  const [lang, _] = useContext(LanguageContext)
  return (
    <div className="pregnancy-box pregnancy-box-small pregnancy-forms">
      <h2 className="heading2">{lang ? 'Lactation' : 'छुटाई'}</h2>
      <DateElement
        name="lactationDate"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={info?.date}
        lang={lang}
      />
    </div>
  )
}

export default LactationForm
