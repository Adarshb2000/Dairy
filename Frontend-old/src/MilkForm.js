import { useNavigate, useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import SelectElement from './SelectElement'
import DateElement from './DateElement'
import { logDetails, nearToday, objectForSubmission } from './Helper'
import { DataBaseError, TokenError } from './CustomErrors'
import LanguageContext from './LanguageContext'

const MilkForm = ({ info = {}, reloadPage = () => {} }) => {
  // Basic
  const [lang, _] = useContext(LanguageContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Params
  const parameters = useParams()

  // form vars
  const [lineNumber, setLineNumber] = useState(info.lineNumber || '')
  const [milk, setMilk] = useState(info.milk || '')
  const animal = parameters.animal || ''
  const [tag, setTag] = useState(parameters.tag || '')

  // autofill
  info.date = info.date ? new Date(info.date) : new Date()
  info.date.setMonth(info.date.getMonth() + 1)
  if (nearToday(info.date)) info.date = new Date()

  const formSubmission = async (e) => {
    e.preventDefault()
    try {
      const object = objectForSubmission(e.target)
      if (Object.keys(object).length != 3) throw new Error('Enter all details')
      setLoading(true)
      await logDetails(
        `/add-milk/${animal || object.animal}/${tag}`,
        objectForSubmission(e.target)
      )
      if (parameters) {
        navigate(`/${animal}/${tag}/#milk`)
        reloadPage()
      } else window.location.reload()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      } else {
        alert(e.message)
      }
    }
  }
  return loading ? (
    <>Loading...</>
  ) : (
    <form
      className="box4 bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      {Object.keys(parameters).length === 0 ? (
        <div className="mb-2">
          <div className="flex-column justify-start sm:flex-row p-4">
            <SelectElement
              label="Animal:"
              name="animal"
              defaultValue={''}
              options={[
                ['Cow', 'cow'],
                ['Buffalo', 'buffalo'],
              ]}
              className="inputs"
            />
            <label className="mt-2 sm:ml-16 sm:mt-0" htmlFor="tag">
              Tag No.:
              <input
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                id="tag"
                name="tag"
                type="number"
                className="inputs w-20"
              />
            </label>
          </div>
          <hr />
        </div>
      ) : (
        <></>
      )}
      <div className="pregnancy-box h-80 sm:h-60 pregnancy-forms">
        <label htmlFor="lineNumber">
          L. N.:
          <input
            className="inputs w-20"
            type="number"
            value={lineNumber}
            name="lineNumber"
            step={1}
            min={0}
            onChange={({ target }) => setLineNumber(target.value)}
          />
        </label>
        <DateElement
          label={lang ? 'Date' : 'दिनांक'}
          name="date"
          lang={lang}
          defaultValue={info.date}
        />
        <label htmlFor="milk">
          {lang ? 'Milk' : 'दूध'}:
          <input
            className="inputs w-20"
            type="number"
            value={milk}
            name="milk"
            step={0.25}
            min={0}
            onChange={({ target: { value } }) => setMilk(value)}
          />
        </label>
        <button className="buttons2 self-center min-w-fit" type="submit">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
      </div>
    </form>
  )
}

export default MilkForm
