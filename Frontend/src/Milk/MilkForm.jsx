import { useContext } from 'react'
import DateElement from '../Custom/DateElement'
import LanguageContext from '../LanguageContext'
import { nearToday } from '../Helpers/helperFunctions'

const MilkForm = ({ data = {}, formSubmission = () => {} }) => {
  // Basic
  const [lang] = useContext(LanguageContext)

  // autofill
  data.date = data.date ? new Date(data.date) : new Date()
  if (nearToday(data.date)) data.date = new Date()

  return (
    <form
      className="box4 mt-4 rounded-xl bg-white px-4 py-2 text-left"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formSubmission({
          lineNumber: Number(formData.get('lineNumber')),
          date: new Date(formData.get('date')),
          milk: Number(formData.get('milk')),
        })
      }}
    >
      <div className="pregnancy-box pregnancy-forms h-80 sm:h-60">
        <label htmlFor="lineNumber">
          L. N.:
          <input
            className="inputs w-20"
            type="number"
            defaultValue={data.lineNumber}
            name="lineNumber"
            step={1}
            min={0}
          />
        </label>
        <DateElement
          label={lang ? 'Date' : 'दिनांक'}
          name="date"
          lang={lang}
          defaultValue={data.date}
        />
        <label htmlFor="milk">
          {lang ? 'Milk' : 'दूध'}:
          <input
            className="inputs w-20"
            type="number"
            name="milk"
            step={0.25}
            defaultValue={data.milk}
            min={0}
          />
        </label>
        <button className="buttons2 w-full min-w-fit self-center" type="submit">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
      </div>
    </form>
  )
}

export default MilkForm
