import { useContext } from 'react'
import DateElement from '../../Custom/DateElement'
import { animalTranslate } from '../../Helpers/helperFunctions'
import LanguageContext from '../../LanguageContext'
import SelectElement from '../../Custom/SelectElement'

const Delivery = ({
  data = {},
  lastDeliveryNumber = 0,
  lastStageDate,
  formSubmission,
}) => {
  const [lang] = useContext(LanguageContext)

  if (!Object.keys(data).length && lastStageDate) {
    const tempDate = new Date(lastStageDate)
    tempDate.setMonth(tempDate.getMonth() + 3)
    data.date = tempDate
  } else {
    data.date = new Date(data.date || Date())
  }

  return (
    <form
      className="pregnancy-box pregnancy-box-big pregnancy-forms"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formSubmission({
          number: Number(formData.get('number')),
          date: new Date(formData.get('date')),
          gender: formData.get('gender'),
          stage: 'DELIVERY',
        })
      }}
    >
      <h2 className="heading2">{lang ? 'Delivery' : 'ब्याही'}</h2>
      <label htmlFor="number">
        {lang ? 'Number' : 'संख्या'}:
        <input
          min={0}
          step={1}
          defaultValue={lastDeliveryNumber + 1}
          type="number"
          name="number"
          className="inputs w-20"
        />
      </label>
      <DateElement
        name="date"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={data?.date || new Date()}
        lang={lang}
      />
      <SelectElement
        name="gender"
        options={[
          [lang ? 'cow' : animalTranslate('cow', 1), 'female'],
          [lang ? 'bull' : animalTranslate('bull', 1), 'male'],
        ]}
        defaultValue={data?.gender || ''}
        label={lang ? 'Gender' : 'पाड़ा/पड़िया'}
        className="inputs min-w-fit max-w-[20]"
        required={true}
      />
      <div className="text-center">
        <button type="submit" className="buttons min-w-fit">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
      </div>
    </form>
  )
}

export default Delivery
