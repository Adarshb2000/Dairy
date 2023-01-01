import { useContext, useState } from 'react'
import LanguageContext from '../LanguageContext'
import Modal from '../Modal'
import DiseaseEditForm from './EditForm/DiseaseEditForm'

const Disease = ({ data }) => {
  const [lang] = useContext(LanguageContext)

  const [editForm, showEditForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [editId, setEditId] = useState(null)

  return (
    <div className="flex-column w-full">
      {data.vaccination[data.vaccination.length - 1]?.cured ? (
        <div className="bg-colour-green disease-cured">
          OK&nbsp;
          {new Date(data.vaccination.slice(-1)[0].date).toLocaleDateString(
            'hi-IN',
            {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            }
          )}
        </div>
      ) : (
        <div className="bg-colour-red disease-cured">
          <span>NOT OK</span>
        </div>
      )}
      <div className="flex overflow-x-auto">
        {data.vaccination.map(({ vaccine, doctor, date, cured, id }) => (
          <button
            className="pregnancy-box bg-colour m-2 h-32 items-center divide-y-2 divide-slate-400 border-2 border-slate-400 font-semibold hover:bg-slate-400"
            key={id}
            onClick={() => {
              setEditId(id)
              setEditData({
                vaccine,
                doctor,
                date,
                cured,
              })
              showEditForm(true)
            }}
          >
            <label htmlFor="vaccine">
              <span className="font-normal">
                {lang ? 'Vaccine' : 'दवाई'}&nbsp;
              </span>
              <span>{vaccine}</span>
            </label>
            <label htmlFor="date">
              {/* {lang ? 'Date' : 'दिनांक'}:{' '} */}
              <span>
                {new Date(date).toLocaleDateString('hi-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })}
              </span>
            </label>

            <label htmlFor="doctor">
              <span className="font-normal">
                {lang ? 'Doctor' : 'डॉक्टर'}&nbsp;
              </span>
              <span>{doctor}</span>
            </label>
          </button>
        ))}
      </div>
      {editForm ? (
        <Modal>
          <DiseaseEditForm
            data={editData}
            id={editId}
            key={'bello'}
            closeForm={() => showEditForm(false)}
          />
          <div className="w-full text-center"></div>
        </Modal>
      ) : null}
    </div>
  )
}

export default Disease
