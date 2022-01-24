import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import SelectElement from './SelectElement'
import DateElement from './DateElement'
import { logDetails, objectForSubmission } from './Helper'
import { DataBaseError, TokenError } from './CustomErrors'

const AddMilkRecord = () => {
  const parameters = useParams()
  const [lineNumber, setLineNumber] = useState(0)
  const [milk, setMilk] = useState(0)
  const [animal, setAnimal] = useState(parameters.animal || '')
  const navigate = useNavigate()
  const [tag, setTag] = useState(parameters.tag || 0)
  const [loading, setLoading] = useState(false)
  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await logDetails(
        `/add-milk/${animal}/${tag}`,
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
    <div>
      <form onSubmit={formSubmission}>
        {Object.keys(parameters).length === 0 ? (
          <div>
            <SelectElement
              label="Animal"
              name="animal"
              defaultValue={''}
              options={[
                ['Cow', 'cow'],
                ['Buffalo', 'buffalo'],
              ]}
            />
            <label htmlFor="tag">
              Tag No.
              <input
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                id="tag"
                name="tag"
                type="number"
              />
            </label>
            <hr />
          </div>
        ) : (
          <></>
        )}
        <label htmlFor="lineNumber">
          {' '}
          Line Number
          <input
            type="number"
            value={lineNumber}
            name="lineNumber"
            step={1}
            min={0}
            onChange={({ target }) => setLineNumber(target.value)}
          />
        </label>
        <br />
        <DateElement label="Date" name="date" />
        <label htmlFor="milk">
          {' '}
          Milk
          <input
            type="number"
            value={milk}
            name="milk"
            step={0.25}
            min={0}
            onChange={({ target: { value } }) => setMilk(value)}
          />
        </label>
        <br />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}

export default AddMilkRecord
