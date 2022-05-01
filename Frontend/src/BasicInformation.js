import { useContext } from 'react'
import { displayDate } from './Helper'
import LanguageContext from './LanguageContext'

const BasicInformation = ({ information = {} }) => {
  const [lang, _] = useContext(LanguageContext)

  /* Basic Information */
  return (
    <div className="pregnancy-box h-48">
      <h2 className="heading2">{lang ? 'Purchase' : 'खरीदा'}</h2>
      <div className="pregnancy-box bg-colour h-24 m-2 overflow-y-auto">
        {information.purchaseDate && (
          <label htmlFor="date">
            {lang ? 'Purchase Date:' : 'तारीख:'}&nbsp;
            <span>
              {displayDate({
                date: information.purchaseDate,
                lang: 'hi-IN',
                month: 'long',
              })}
            </span>
          </label>
        )}
        {information.seller && (
          <label htmlFor="seller">
            {lang ? 'seller' : 'विक्रेता'}: <span>{information.seller}</span>
          </label>
        )}
        {information.vehicleNumber && (
          <label htmlFor="vehicleNumber">
            {lang ? 'Vehicle Number' : 'वाहन संख्या'}:&nbsp;
            <span>{information.vehicleNumber}</span>
          </label>
        )}
      </div>
    </div>
  )
}

export default BasicInformation
