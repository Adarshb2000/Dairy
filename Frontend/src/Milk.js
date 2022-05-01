import { useContext, useState } from 'react'
import LanguageContext from './LanguageContext'
import MilkDisplay from './MilkDisplay'
import MilkForm from './MilkForm'

const Milk = ({ milk = [], forms = [], hideForms = () => {} }) => {
  // Basic
  const [lang, _] = useContext(LanguageContext)

  // Form Display
  const [formDisplay, setFormDisplay] = useState(false)
  forms.push(setFormDisplay)
  const displayForm = () => {
    hideForms()
    setTimeout(() => setFormDisplay(true), 0)
  }

  const [milkDisplay, setMilkDisplay] = useState(5)

  return (
    <div className="pregnancy-box h-auto">
      <h2 className="heading2">{lang ? 'MILK RECORD' : 'दूध का रिकॉर्ड'}</h2>
      <MilkDisplay info={milk.slice(0, milkDisplay)} />
      {formDisplay ? (
        <div className="h-auto self-center">
          <MilkForm />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <button
          hidden={!milk.length}
          className="buttons2 w-28 m-2"
          onClick={() => {
            if (milkDisplay >= milk.length) setMilkDisplay(5)
            else setMilkDisplay(milkDisplay + 5)
          }}
        >
          {milkDisplay >= milk.length ? 'Show Less' : 'Show more'}
        </button>
        <button className="buttons2 w-24 m-2" onClick={displayForm}>
          {lang ? 'Add Milk' : 'दूध जोड़ें'}
        </button>
      </div>
    </div>
  )
}

export default Milk
