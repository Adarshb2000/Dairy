import { useContext } from 'react'
import { displayDate } from './Helper'
import LanguageContext from './LanguageContext'

const PregnancyDisplay = ({
  info: { copulation, examination, lactation, delivery, index },
  pregnancyEdit,
}) => {
  const [lang, _] = useContext(LanguageContext)

  return (
    <div className="flex overflow-x-auto lg:overflow-hidden">
      {/* Copulation Display */}
      {copulation && (
        <button
          className="pregnancy-box min-w-fit bg-colour h-32 m-2 hover:bg-slate-400"
          onClick={() => pregnancyEdit(copulation, 0, index)}
        >
          <h2 className="heading3">{lang ? 'Copulation' : 'उथि'}</h2>
          {copulation.date && (
            <label htmlFor="date">
              {lang ? 'Date' : 'दिनांक'}:{' '}
              <span>{displayDate({ date: copulation.date })}</span>
            </label>
          )}
          {copulation.worker && (
            <label htmlFor="worker">
              {lang ? 'Worker' : 'कर्मचारी'}: <span>{copulation.worker}</span>
            </label>
          )}
          {copulation.bullNumber && (
            <label htmlFor="bullNumber">
              {lang ? 'Bull Number' : 'बैल संख्या'}:{' '}
              <span>{copulation.bullNumber}</span>
            </label>
          )}
        </button>
      )}
      {/* Examination Display */}
      {examination && (
        <button
          className="information-display-box"
          onClick={() => pregnancyEdit(examination, 1, index)}
        >
          <h2 className="heading3">{lang ? 'Examination' : 'Test'}</h2>
          <label htmlFor="date">
            {lang ? 'Date' : 'दिनांक'}:{' '}
            <span>{displayDate({ date: examination.date })}</span>
          </label>
          <label htmlFor="doctor">
            {lang ? 'Doctor' : 'डॉक्टर'}: <span>{examination.doctor}</span>
          </label>
          {examination.duration && (
            <label htmlFor="duration">
              {lang ? 'Duration' : 'समय'}: {examination.duration}{' '}
              {lang ? 'months' : 'महीने'}
            </label>
          )}
          <label htmlFor="isPregnant">
            {examination.isPregnant ? (
              <span className="text-green-600 font-bold">Pregnant</span>
            ) : (
              <span className="text-red-600 font-bold">Not Pregnant</span>
            )}
          </label>
        </button>
      )}
      {/* Lactation Display */}
      {lactation && (
        <button
          className="pregnancy-box justifying-start min-w-fit bg-colour h-32 m-2 hover:bg-slate-400"
          onClick={() => pregnancyEdit(lactation, 2, index)}
        >
          <h2 className="heading3">{lang ? 'Lactation' : 'छुटाई'}</h2>
          <label htmlFor="date">
            {lang ? 'Date' : 'दिनांक'}:{' '}
            <span>
              {displayDate({
                date: lactation.date,
              })}
            </span>
          </label>
        </button>
      )}
      {/* Delivery Display */}
      {delivery && (
        <button
          className="information-display-box"
          onClick={() => pregnancyEdit(delivery, 3, index)}
        >
          <h2 className="heading3">{lang ? 'Delivery' : 'ब्याही'}</h2>
          <label htmlFor="number">
            {lang ? 'Number' : 'संख्या'}: <span>{delivery.number}</span>
          </label>
          <label htmlFor="date">
            {lang ? 'Date' : 'दिनांक'}:{' '}
            <span>
              {displayDate({
                date: delivery.date,
              })}
            </span>
          </label>
          <label htmlFor="gender">
            Gender:{' '}
            <span>{delivery.gender === 'female' ? 'padiya' : 'pada'}</span>
          </label>
        </button>
      )}
    </div>
  )
}

export default PregnancyDisplay
