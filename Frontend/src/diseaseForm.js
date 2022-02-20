import { useNavigate, useParams, useLocation } from 'react-router-dom'
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
  const pathname = useLocation().pathname

  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    const body = getObject(e.target)
    try {
      await logDetails(subRoute, body)
      if (pathname === `/add-disease/${animal}/${tag}`)
        navigate(`/${animal}/${tag}`, { replace: true })
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
    <form
      className="box4 h-96 sm:h-60 bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      <DateElement label="Date:" name="date" className="inputs w-20" />
      <label htmlFor="doctor">
        Doctor:
        <input
          type="text"
          name="doctor"
          className="inputs"
          value={doctor}
          onChange={({ target }) => {
            setDoctor(target.value)
          }}
        />
      </label>
      <label htmlFor="vaccine">
        Vaccine:
        <input
          type="text"
          name="vaccine"
          value={vaccine}
          onChange={({ target }) => setVaccine(target.value)}
          className="inputs w-20"
        />
      </label>
      <SelectElement
        name="cured"
        options={[
          ['Yes', true],
          ['No', false],
        ]}
        label="Cured:"
        defaultValue={false}
        className="inputs"
      />
      <button className="buttons self-center" type="submit">
        Submit
      </button>
    </form>
  )
}

export default DiseaseForm
