import { useContext, useState } from 'react'
import DateElement from '../DateElement'
import { animalTranslate } from '../Helper'
import LanguageContext from '../LanguageContext'
import SelectElement from '../SelectElement'

const DeliveryForm = ({ info, deliveryNumber = 0 }) => {
  const [number, setNumber] = useState(info?.number || deliveryNumber || '')
  const [lang, _] = useContext(LanguageContext)

  return (
    <div className="pregnancy-box pregnancy-box-big pregnancy-forms">
      <h2 className="heading2">{lang ? 'Delivery' : 'ब्याही'}</h2>
      <label htmlFor="number">
        {lang ? 'Number' : 'संख्या'}:
        <input
          min={0}
          step={1}
          type="number"
          name="number"
          value={number}
          onChange={({ target }) => setNumber(target.value)}
          className="inputs w-20"
        />
      </label>
      <DateElement
        name="deliveryDate"
        label={lang ? 'Date' : 'दिनांक'}
        defaultValue={info?.date}
        lang={lang}
      />
      <SelectElement
        name="gender"
        options={[
          [lang ? 'cow' : animalTranslate('cow', 1), 'female'],
          [lang ? 'bull' : animalTranslate('bull', 1), 'male'],
        ]}
        defaultValue={info?.gender || ''}
        label={lang ? 'Gender' : 'पाड़ा/पड़िया'}
        className="inputs min-w-fit max-w-[20]"
        required={true}
      />
    </div>
  )
}

export default DeliveryForm
