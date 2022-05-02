import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import DateElement from './DateElement'
import BinaryElement from './BinaryElement'
import { DataBaseError, TokenError } from './CustomErrors'
import { logDetails, logout } from './Helper'
import { objectForDiseaseForm, objectForVaccineForm } from './diseaseObjects'
import LanguageContext from './LanguageContext'

const DiseaseForm = ({
  mode,
  info = {},
  diseaseIndex = 0,
  vaccineIndex = 0,
  reloadPage = () => {},
}) => {
  // mode -> 0 : Add new Disease
  // mode -> 1 : Add Vaccine
  // mode -> 2 : update existing

  const [lang, _] = useContext(LanguageContext)

  const { animal, tag } = useParams()
  const subRoute =
    mode === 0
      ? `/add-disease/${animal}/${tag}`
      : mode === 1
      ? `/add-vaccine/${animal}/${tag}/`
      : `/update-disease/${animal}/${tag}/${diseaseIndex}/${vaccineIndex}`

  info.date = new Date(info.date || Date())

  const getObject = mode === 0 ? objectForDiseaseForm : objectForVaccineForm

  const [doctor, setDoctor] = useState(info.doctor || '')
  const [vaccine, setVaccine] = useState(info.vaccine || '')

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formSubmission = async (e) => {
    e.preventDefault()
    var body
    try {
      body = getObject(e.target)
    } catch (e) {
      alert(e.message)
      return
    }
    setLoading(true)
    try {
      await logDetails(subRoute, body)
      navigate(`/${animal}/${tag}#diseases`)
      reloadPage()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('no such record found')
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
      className="box4 h-auto bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      <div className="pregnancy-box h-80 sm:h-60 pregnancy-forms">
        <label htmlFor="vaccine">
          {lang ? 'Vaccine' : 'दवाई'}:
          <input
            type="text"
            name="vaccine"
            value={vaccine}
            onChange={({ target }) => setVaccine(target.value)}
            className="inputs w-28"
          />
        </label>
        <DateElement
          label={lang ? 'Date' : 'दिनांक'}
          name="date"
          defaultValue={info.date}
          lang={lang}
        />
        <label htmlFor="doctor">
          {lang ? 'Doctor' : 'डॉक्टर'}:
          <input
            type="text"
            name="doctor"
            className="inputs w-28"
            value={doctor}
            onChange={({ target }) => {
              setDoctor(target.value)
            }}
          />
        </label>
        <BinaryElement
          name="cured"
          options={lang ? ['no', 'yes'] : ['नहीं', 'हां']}
          label={lang ? 'Cured?' : 'क्या यह अब ठीक है?'}
          defaultValue={info.cured}
        />
      </div>

      <button className="buttons min-w-fit self-center" type="submit">
        {lang ? 'Submit' : 'जमा करें।'}
      </button>
    </form>
  )
}

export default DiseaseForm
