import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import { logDetails, logout, objectForSubmission } from './Helper'
import CopulationForm from './pregnancy-forms/CopulationForm'
import DeliveryForm from './pregnancy-forms/DeliveryForm'
import ExaminationForm from './pregnancy-forms/ExaminationForm'
import LactationForm from './pregnancy-forms/LactationForm'

const AddPregnancyRecord = () => {
  const { animal, tag } = useParams()
  const { pathname: subRoute } = useLocation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      completed: true,
    }
    try {
      await logDetails(subRoute, pregnancyData)
      navigate(`/${animal}/${tag}`, { replace: true })
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
    <>Loading... </>
  ) : (
    <div className="wrapper">
      <h1 className="heading1 pb-3">PREGNANCY RECORD</h1>
      <div className="flex-column justify-start rounded-lg w-5/6 sm:pl-14 h-auto overflow-y-scroll bg-white px-4 pb-4">
        <form className="flex-column sm:w-3/4" onSubmit={formSubmission}>
          <h2 className="text-2xl text-red1 font-bold py-3 self">
            {animal.toUpperCase()} &nbsp;{tag}
          </h2>
          <CopulationForm />
          <ExaminationForm />
          <LactationForm />
          <DeliveryForm />

          <button
            className="buttons2 w-5/6 my-3 text-lg font-semibold self-center"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPregnancyRecord
