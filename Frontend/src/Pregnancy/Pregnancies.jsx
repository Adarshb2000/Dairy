import { useContext, useState } from 'react'
import PregnancySummary from './PregnancySummary'
import LanguageContext from '../LanguageContext'
import {
  pregnancyStages,
  translatedPregnancyStages,
} from '../Helpers/constants'
import Modal from '../Modal'
import CreatePregnancy from './PregnancyForms/CreatePregnancy'
import UpdatePregnancy from './PregnancyForms/UpdatePregnancy'

const Pregnancies = ({ pregnancies }) => {
  const [lang] = useContext(LanguageContext)

  const lastPregnancy = pregnancies[0]
  const [form, showForm] = useState(false)

  return (
    <div className="pregnancy-box bg-colour h-auto">
      <h2 className="heading2">Pregnancy</h2>
      <div className="pregnancy-box">
        {pregnancies.map((e) => (
          <PregnancySummary key={e.id} pregnancy={e} />
        ))}
        {lastPregnancy?.completed ?? true ? (
          <div className="text-center">
            <button
              className="buttons min-w-fit"
              onClick={() => showForm(true)}
            >
              {lang ? `Create Pregnancy` : `नई जानकारी जोड़ें`}
            </button>
            {form ? (
              <Modal>
                <CreatePregnancy
                  closeForm={() => {
                    showForm(false)
                  }}
                />
              </Modal>
            ) : null}
          </div>
        ) : (
          <div className="text-center">
            <button
              className="buttons min-w-fit"
              onClick={() => showForm(true)}
            >
              {lang
                ? `Add ${
                    pregnancyStages[
                      pregnancyStages.indexOf(lastPregnancy.stage) + 1
                    ]
                  } Details`
                : `${
                    translatedPregnancyStages[
                      pregnancyStages.indexOf(lastPregnancy.stage) + 1
                    ]
                  } ki jankari dale`}
            </button>
            {form ? (
              <Modal>
                <div>
                  <UpdatePregnancy
                    pregnancy={pregnancies[0]}
                    closeForm={() => showForm(false)}
                  />
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default Pregnancies
