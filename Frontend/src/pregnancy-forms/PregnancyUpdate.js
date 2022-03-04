import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { logDetails, objectForSubmission } from '../Helper'
import objectForPregnancyForm from '../objectForPregnancyForm'
import CopulationForm from './CopulationForm'
import DeliveryForm from './DeliveryForm'
import ExaminationForm from './ExaminationForm'
import LactationForm from './LactationForm'

const PregnancyUpdate = ({ info, phase }) => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(false)
  const subRoute = `/update-pregnancy/${animal}/${tag}`
  if (info.date) {
    info.date = new Date(info.date)
  }
  const phases = {
    0: <CopulationForm info={info} />,
    1: <ExaminationForm info={info} />,
    2: <LactationForm info={info} />,
    3: <DeliveryForm info={info} />,
  }

  const formSubmission = async (e) => {
    e.preventDefault()
    let object
    try {
      object = objectForPregnancyForm(objectForSubmission(e.target), phase)
    } catch (e) {
      alert(e.message)
      return
    }
    setLoading(true)
    try {
      await logDetails(subRoute, object)
      window.location.reload()
    } catch (e) {
      alert(e.message)
    }
  }

  return loading ? (
    <>Loading</>
  ) : (
    <form
      className="box4 min-h-fit bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      {phases[phase]}
      <div className="flex justify-evenly">
        <button type="submit" className="buttons2 w-auto">
          Submit
        </button>
      </div>
    </form>
  )
}

export default PregnancyUpdate
