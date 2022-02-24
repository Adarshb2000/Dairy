import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import SelectElement from './SelectElement'
import DateElement from './DateElement'
import { logDetails, objectForSubmission } from './Helper'
import { DataBaseError, TokenError } from './CustomErrors'

const MilkForm = () => {
  const parameters = useParams()
  const [lineNumber, setLineNumber] = useState(0)
  const [milk, setMilk] = useState(0)
  const animal = useState(parameters.animal || '')
  const navigate = useNavigate()
  const [tag, setTag] = useState(parameters.tag || 0)
  const [loading, setLoading] = useState(false)
  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const object = objectForSubmission(e.target)
      const res = await logDetails(
        `/add-milk/${animal || object.animal}/${tag}`,
        objectForSubmission(e.target)
      )
      window.location.reload()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      }
    }
  }
  return loading ? (
    <>Loading...</>
  ) : (
    <form
      className="box4 h-96 sm:h-60 bg-white rounded-xl mt-4 px-4 py-2"
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
      <label htmlFor="lineNumber">
        Line Number:
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
      <DateElement label="Date:" name="date" className="inputs w-20" />
      <label htmlFor="milk">
        Milk:
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
      <button className="buttons self-center" type="submit">
        Submit
      </button>
    </form>
  )
}

export default MilkForm
