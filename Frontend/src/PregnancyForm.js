import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import { logDetails, objectForSubmission } from './Helper'
import objectForPregnancyForm from './objectForPregnancyForm'
import CopulationForm from './pregnancy-forms/CopulationForm'
import DeliveryForm from './pregnancy-forms/DeliveryForm'
import ExaminationForm from './pregnancy-forms/ExaminationForm'
import LactationForm from './pregnancy-forms/LactationForm'

const PregnancyForm = ({ lastPregnancy }) => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(false)
  const subRoute = !lastPregnancy
    ? `/add-pregnancy/${animal}/${tag}`
    : `/update-pregnancy/${animal}/${tag}`

  const phases = {
    0: <CopulationForm />,
    1: <ExaminationForm />,
    2: <LactationForm />,
    3: <DeliveryForm />,
  }

  const phase = !lastPregnancy
    ? 0
    : !lastPregnancy.examination
    ? 1
    : !lastPregnancy.lactation
    ? 2
    : 3

  const formSubmission = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await logDetails(
        subRoute,
        objectForPregnancyForm(objectForSubmission(e.target), phase)
      )
      window.location.reload()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      } else {
        console.log(e)
      }
    }
  }
  return loading ? (
    <>Loading...</>
  ) : (
    <form
      className="box4 h-96 sm:h-60 min-h-fit bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      {phases[phase]}
      <div className="flex justify-evenly">
        <button type="submit" className="buttons2 w-auto">
          Submit
        </button>
        <button className="buttons2 w-fit">Miscarriage</button>
      </div>
    </form>
  )
}

export default PregnancyForm
