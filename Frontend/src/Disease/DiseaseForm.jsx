import { useContext } from 'react'
import BinaryElement from '../Custom/BinaryElement'
import LanguageContext from '../LanguageContext'
import DateElement from '../Custom/DateElement'

const DiseaseForm = ({ data = {}, formSubmission = () => {} }) => {
  const [lang] = useContext(LanguageContext)

  return (
    <form
      className="box4 mt-4 h-auto rounded-xl bg-white px-4 py-2"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formSubmission({
          vaccine: formData.get('vaccine'),
          doctor: formData.get('doctor'),
          cured: formData.get('cured') === 'on',
          date: new Date(formData.get('date')),
        })
      }}
    >
      <div className="pregnancy-box pregnancy-forms h-80 sm:h-60">
        <label htmlFor="vaccine">
          {lang ? 'Vaccine' : 'दवाई'}:
          <input
            type="text"
            name="vaccine"
            className="inputs w-28"
            defaultValue={data.vaccine || ''}
          />
        </label>
        <DateElement
          label={lang ? 'Date' : 'दिनांक'}
          name="date"
          defaultValue={new Date(data.date || Date())}
          lang={lang}
        />
        <label htmlFor="doctor">
          {lang ? 'Doctor' : 'डॉक्टर'}:
          <input
            type="text"
            name="doctor"
            className="inputs w-28"
            defaultValue={data.doctor || ''}
          />
        </label>
        <BinaryElement
          name="cured"
          options={lang ? ['no', 'yes'] : ['नहीं', 'हां']}
          label={lang ? 'Cured?' : 'क्या यह अब ठीक है?'}
          defaultValue={data.cured || false}
        />
        <div className="flex justify-evenly">
          <button className="buttons min-w-fit self-center" type="submit">
            {lang ? 'Submit' : 'जमा करें।'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default DiseaseForm
