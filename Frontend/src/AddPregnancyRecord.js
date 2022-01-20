import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DateElement from './DateElement'
import { objectForSubmission } from './Helper'
import SelectElement from './SelectElement'

const AddPregnancyRecord = () => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(false)
  const [bullNumber, setBullNumber] = useState(0)
  const [supervisor, setSupervisor] = useState('bleh')
  const [gender, setGender] = useState('female')
  const [doctor, setDoctor] = useState('bleh2')
  const [isPregnant, setIsPregnant] = useState(true)
  return loading ? (
    <>Loading... </>
  ) : (
    <div>
      <h1>
        Tag No: {tag} &nbsp; {animal}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(objectForSubmission(e.target))
        }}
      >
        <div>
          <h2>Uthi</h2>
          <DateElement name="uthiDate" label="Uthi" />
          <label htmlFor="bullNumber">
            {' '}
            BullNumber
            <input
              type="number"
              value={bullNumber}
              onChange={(e) => {
                setBullNumber(e.target.value)
              }}
              min={0}
              step={1}
              name="bullNumber"
            />
          </label>
          <br />
          <label htmlFor="supervisor">
            {' '}
            Supervisor
            <input
              type="text"
              value={supervisor}
              onChange={({ target }) => setSupervisor(target.value)}
              name="supervisor"
            />
          </label>
          <br />
        </div>
        <div>
          <h2>Test</h2>
          <DateElement name="testDate" label="Test" />
          <SelectElement
            options={[
              ['No', false],
              ['Yes', true],
            ]}
            name="isPregnant"
            defaultValue=""
            label="Pregnant"
          />
          <br />
          <label htmlFor="doctor">
            {' '}
            Doctor
            <input
              type="text"
              value={doctor}
              onChange={({ target }) => setDoctor(target.value)}
              name="doctor"
            />
          </label>
          <br />
        </div>
        <br />
        <br />
        <DateElement name="lactationDate" label="Hurai" />
        <br />
        <div>
          <h2>Delivery</h2>
          <DateElement name="deliveryDate" label="Delivery" />
          <br />
          <SelectElement
            name="gender"
            options={[
              ['Padiya', 'female'],
              ['Pada', 'male'],
            ]}
            defaultValue=""
            label={'Gender'}
          />
        </div>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddPregnancyRecord
