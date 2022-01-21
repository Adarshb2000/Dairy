import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import DateElement from './DateElement'
import { logDetails, logout, objectForSubmission } from './Helper'
import SelectElement from './SelectElement'

const AddPregnancyRecord = () => {
  const { animal, tag } = useParams()
  const { pathname: subRoute } = useLocation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [bullNumber, setBullNumber] = useState(0)
  const [worker, setWorker] = useState('bleh')
  const [number, setNumber] = useState(0)
  const [doctor, setDoctor] = useState('bleh2')

  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = objectForSubmission(e.target)
    const pregnancyData = {
      copulation: {
        date: data.uthiDate,
        bullNumber: data.bullNumber,
        worker: data.worker,
      },
      examination: {
        date: data.testDate,
        doctor: data.doctor,
        duration: data.duration,
        isPregnant: data.isPregnant === 'true' ? true : false,
      },
      lactation: {
        date: data.lactationDate,
      },
      delivery: {
        number: data.number,
        date: data.deliveryDate,
        gender: data.gender,
      },
    }
    try {
      const sentData = await logDetails(subRoute, pregnancyData)
      console.log(sentData)
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      }
    }
    setLoading(false)
  }

  return loading ? (
    <>Loading... </>
  ) : (
    <div>
      <h1>
        Tag No: {tag} &nbsp; {animal}
      </h1>
      <form onSubmit={formSubmission}>
        <div>
          <h2>Uthi</h2>
          <DateElement name="uthiDate" label="Date" />
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
          <label htmlFor="worker">
            {' '}
            Worker
            <input
              type="text"
              value={worker}
              onChange={({ target }) => setWorker(target.value)}
              name="worker"
            />
          </label>
          <br />
        </div>
        <div>
          <h2>Test</h2>
          <DateElement name="testDate" label="Date" />
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
        <h2>Hurai</h2>
        <DateElement name="lactationDate" label="Date" />
        <br />
        <div>
          <h2>Delivery</h2>
          <label htmlFor="number">
            {' '}
            Number
            <input
              min={0}
              step={1}
              type="number"
              name="number"
              value={number}
              onChange={({ target }) => setNumber(target.value)}
            />
          </label>
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
