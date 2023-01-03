import { useContext, useState } from 'react'
import Disease from './Disease'
import LanguageContext from '../LanguageContext'
import Modal from '../Modal'
import DiseaseCreateForm from './CreateForm/DiseaseCreateForm'
import VaccineCreateForm from './CreateForm/VaccineCreateForm'

const Diseases = ({ diseases = [] }) => {
  const [lang] = useContext(LanguageContext)
  const [form, showForm] = useState(false)
  const last = diseases[0]?.vaccination[diseases[0].vaccination.length - 1]
  const lastCured = last?.cured ?? true

  return (
    <div className="pregnancy-box bg-colour">
      <h2 className="heading2">Disease</h2>
      <div className="pregnancy-box h-auto">
        <div className="max-h-[200px] divide-y-4 divide-white overflow-y-auto">
          {diseases.map((data) => (
            <Disease data={data} key={data.id} />
          ))}
        </div>
        {lastCured ? (
          <div className="text-center">
            <button
              className="buttons min-w-fit"
              onClick={() => showForm(true)}
            >
              {lang ? 'Add Disease' : 'नई दवाई डालें'}
            </button>
            {form ? (
              <Modal>
                <DiseaseCreateForm closeForm={() => showForm(false)} />
                <div className="text-center">
                  <button className="buttons " onClick={() => showForm(false)}>
                    {lang ? 'Close' : 'बंद करें'}
                  </button>
                </div>
              </Modal>
            ) : null}
          </div>
        ) : (
          <div className="text-center">
            <button
              className="buttons min-w-fit"
              onClick={() => showForm(true)}
            >
              {lang ? 'Add Vaccine' : 'दवाई जोड़ें'}
            </button>
            {form ? (
              <Modal>
                <VaccineCreateForm
                  data={last}
                  closeForm={() => showForm(false)}
                />
                <div className="text-center">
                  <button className="buttons" onClick={() => showForm(false)}>
                    {lang ? 'Close' : 'बंद करें'}
                  </button>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default Diseases
