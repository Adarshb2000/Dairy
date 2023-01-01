import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataBaseError, TokenError } from '../CustomErrors'
import DeleteButton from '../DeleteButton'
import { logDetails, objectForSubmission } from '../Helper'
import LanguageContext from '../LanguageContext'
import objectForPregnancyForm from '../objectForPregnancyForm'
import CopulationForm from './CopulationForm'
import DeliveryForm from './DeliveryForm'
import ExaminationForm from './ExaminationForm'
import LactationForm from './LactationForm'

const PregnancyForm = ({
  phase: ph,
  edit = false,
  info = {},
  deliveryNumber = 0,
  pregnancyNumber = 0,
  reloadPage = () => {},
}) => {
  const [lang, _] = useContext(LanguageContext)
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState(ph ? ph : 0)
  const navigate = useNavigate()

  const subRoute = !(ph || edit)
    ? `/add-pregnancy/${animal}/${tag}`
    : `/update-pregnancy/${animal}/${tag}/${pregnancyNumber}`

  if (info.date) {
    info.date = new Date(info.date)
  }

  const phases = {
    0: <CopulationForm info={info} />,
    1: <ExaminationForm info={info} copulationDate={info.copulationDate} />,
    2: <LactationForm info={info} />,
    3: <DeliveryForm info={info} deliveryNumber={deliveryNumber} />,
  }

  const formSubmission = async (e) => {
    e.preventDefault()
    var object
    try {
      object = objectForPregnancyForm(objectForSubmission(e.target), phase)
    } catch (e) {
      alert(e.message)
      return
    }
    setLoading(true)
    try {
      await logDetails(subRoute, object)
      navigate(`/${animal}/${tag}#pregnancies`, { replace: true })
      reloadPage()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      } else {
        alert(e.message)
      }
    }
  }

  return loading ? (
    <>Loading...</>
  ) : (
    <form
      className="box4 min-h-fit bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      {phases[phase]}
      <div className="flex justify-evenly">
        <button type="submit" className="buttons2 w-auto">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
        {ph === 3 || edit || (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setPhase((phase + 1) % 4)
            }}
            className="buttons2 w-auto"
          >
            skip
          </button>
        )}

        {(!pregnancyNumber && !(ph || edit)) || (
          <DeleteButton
            subRoute={`/abortion/${animal}/${tag}`}
            navigate={() => window.location.reload()}
            alertDialog="Are you sure you want to abort"
            text="Abortion"
          />
        )}
        {!pregnancyNumber && edit && (
          <DeleteButton
            subRoute={`/delete-pregnancy/${animal}/${tag}`}
            body={{ phase: phase }}
            navigate={() => {
              window.location.reload()
            }}
            alertDialog={'Are you sure you want to delete this pregnancy'}
            text={'Delete'}
          />
        )}
      </div>
    </form>
  )
}

export default PregnancyForm
