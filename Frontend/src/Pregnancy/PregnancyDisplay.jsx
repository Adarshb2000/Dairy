import { useContext, useState } from 'react'
import { displayDate } from '../Helpers/helperFunctions'
import LanguageContext from '../LanguageContext'
import EditPregnancy from './PregnancyForms/EditPregnancy'
import Modal from '../Modal'

const PregnancyDisplay = ({
  data: { copulation, examination, lactation, delivery, id },
}) => {
  const [lang] = useContext(LanguageContext)

  const [form, showForm] = useState(false)
  const [editStage, setEditStage] = useState('')
  const [editData, setEditData] = useState({})

  return (
    <div className="mb-1 flex overflow-x-auto rounded-lg bg-rose-300">
      {/* Copulation Display */}
      {copulation && (
        <button
          className="pregnancy-box bg-colour m-2 h-32 min-w-fit hover:bg-slate-400"
          onClick={() => {
            setEditData(copulation)
            setEditStage('COPULATION')
            showForm(true)
          }}
        >
          <h2 className="heading3">{lang ? 'Copulation' : 'उठी'}</h2>
          {copulation.date && (
            <label htmlFor="date">
              {lang ? 'Date' : 'दिनांक'}
              <span className="ml-2">
                {displayDate({ date: copulation.date })}
              </span>
            </label>
          )}
          {copulation.worker && (
            <label htmlFor="worker">
              {lang ? 'Worker' : 'कर्मचारी'}{' '}
              <span className="ml-2">{copulation.worker}</span>
            </label>
          )}
          {copulation.bullNumber && (
            <label htmlFor="bullNumber">
              {lang ? 'Bull Number' : 'बैल संख्या'}
              <span className="ml-2">{copulation.bullNumber}</span>
            </label>
          )}
        </button>
      )}
      {/* Examination Display */}
      {examination && (
        <button
          className="information-display-box"
          onClick={() => {
            setEditData(examination)
            setEditStage('EXAMINATION')
            showForm(true)
          }}
        >
          <h2 className="heading3">{lang ? 'Examination' : 'Test'}</h2>
          <label htmlFor="date">
            {lang ? 'Date' : 'दिनांक'}
            <span className="ml-2">
              {displayDate({ date: examination.date })}
            </span>
          </label>
          <label htmlFor="doctor">
            {lang ? 'Doctor' : 'डॉक्टर'}
            <span className="ml-2">{examination.doctor}</span>
          </label>
          {examination.duration && (
            <label htmlFor="duration">
              {lang ? 'Duration' : 'समय'}: {examination.duration}{' '}
              {lang ? 'months' : 'महीने'}
            </label>
          )}
          <label htmlFor="isPregnant">
            {examination.isPregnant ? (
              <span className="font-bold text-green-600">Pregnant</span>
            ) : (
              <span className="font-bold text-red-600">Not Pregnant</span>
            )}
          </label>
        </button>
      )}
      {/* Lactation Display */}
      {lactation && (
        <button
          className="pregnancy-box justifying-start bg-colour m-2 h-32 min-w-fit hover:bg-slate-400"
          onClick={() => {
            setEditData(lactation)
            setEditStage('LACTATION')
            showForm(true)
          }}
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
          onClick={() => {
            setEditData(delivery)
            setEditStage('DELIVERY')
            showForm(true)
          }}
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
      {form ? (
        <Modal>
          <div>
            <EditPregnancy
              data={editData}
              id={id}
              stage={editStage}
              closeForm={() => showForm(false)}
            />
            <div className="text-center">
              <button className="buttons" onClick={() => showForm(false)}>
                {lang ? 'Close' : 'बंद करें'}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default PregnancyDisplay
