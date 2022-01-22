import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import DateElement from './DateElement'
import SelectElement from './SelectElement'

const AddDiseaseRecord = ({ formSubmission }) => {
  const { animal, tag } = useParams()
  const { pathname: subRoute } = useLocation()
  const [doctor, setDoctor] = useState('')
  const [loading, setLoading] = useState(false)
  const [vaccine, setVaccine] = useState('')
  const navigate = useNavigate()

  return loading ? (
    <>Loading...</>
  ) : (
    <div>
      <h1>Disease Record</h1>
      <h1>
        Tag Number: {tag} &nbsp; Animal: {animal}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setLoading(true)
          formSubmission(e.target, subRoute, navigate, animal, tag)
        }}
      >
        <DateElement label="Date" name="diseaseDate" />
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

export default AddDiseaseRecord
