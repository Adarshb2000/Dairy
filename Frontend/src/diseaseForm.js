import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import DateElement from './DateElement'
import SelectElement from './SelectElement'
import { DataBaseError, TokenError } from './CustomErrors'
import { logDetails, logout } from './Helper'
import { objectForDiseaseForm, objectForVaccineForm } from './diseaseObjects'

const DiseaseForm = ({ disease = true }) => {
  const { animal, tag } = useParams()
  const subRoute = disease
    ? `/add-disease/${animal}/${tag}`
    : `/add-vaccine/${animal}/${tag}`
  const getObject = disease ? objectForDiseaseForm : objectForVaccineForm
  const [doctor, setDoctor] = useState('')
  const [loading, setLoading] = useState(false)
  const [vaccine, setVaccine] = useState('')
  const navigate = useNavigate()

  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    const body = getObject(e.target)
    try {
      await logDetails(subRoute, body)
      if (disease) navigate(`/${animal}/${tag}`, { replace: true })
      else window.location.reload()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('no such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      }
    }
  }

  return loading ? (
    <>Loading...</>
  ) : (
    <div>
      <form onSubmit={formSubmission}>
        <DateElement label="Date" name="date" />
        <br />
        <label htmlFor="doctor">
          Doctor
          <input
            type="text"
            name="doctor"
            value={doctor}
            onChange={({ target }) => {
              setDoctor(target.value)
            }}
          />
        </label>
        <br />
        <label htmlFor="vaccine">
          {' '}
          Vaccine
          <input
            type="text"
            name="vaccine"
            value={vaccine}
            onChange={({ target }) => setVaccine(target.value)}
          />
        </label>
        <SelectElement
          name="cured"
          options={[
            ['Yes', true],
            ['No', false],
          ]}
          label="Cured"
          defaultValue={false}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}

export default DiseaseForm
