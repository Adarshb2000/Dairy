import PregnancyDisplay from './PregnancyDisplay'
import PregnancyForm from './pregnancy-forms/PregnancyForm'
import { useContext, useRef, useState } from 'react'
import PregnancyDisplayBrief from './PregnancyDisplayBrief'
import LanguageContext from './LanguageContext'
import { nearToday } from './Helper'

const Pregnancies = ({
  pregnancies = [],
  forms = [],
  deliveries = 0,
  hideForms = () => {},
  reloadPage = () => {},
}) => {
  // Basic
  const [lang, _] = useContext(LanguageContext)

  const phases = ['copulation', 'examination', 'lactation', 'delivery']
  const phaseTime = [0, 2, 5, 3]

  // Pregnancy
  const currentPhase =
    !pregnancies.length || pregnancies[0].completed || pregnancies[0].delivery
      ? 3
      : pregnancies[0].lactation
      ? 2
      : pregnancies[0].examination
      ? 1
      : 0

  const nextDeliveryNumber = deliveries + 1
  const currentPhaseDate = new Date(
    pregnancies.length ? pregnancies[0][phases[currentPhase]]?.date : ''
  )

  const today = new Date()

  const nextPhaseDate = currentPhase !== 3 ? new Date(currentPhaseDate) : today

  nextPhaseDate.setMonth(
    nextPhaseDate.getMonth() + phaseTime[(currentPhase + 1) % phases.length]
  )

  if (nearToday(nextPhaseDate, today))
    nextPhaseDate.setFullYear(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

  const nextPhaseInfo = {
    date: nextPhaseDate,
  }

  if (currentPhase === 2) nextPhaseInfo.number = deliveries + 1
  else if (currentPhase === 0) nextPhaseInfo.copulationDate = currentPhaseDate

  // Form Display
  const [formDisplay, setFormDisplay] = useState(false)
  forms.push(setFormDisplay)
  const displayForm = () => {
    hideForms()
    setTimeout(() => setFormDisplay(true), 0)
  }

  // Form rest
  const formRef = useRef(null)
  const [formInfo, setFormInfo] = useState({})
  const [formPhase, setFormPhase] = useState((currentPhase + 1) % 4)
  const [pregnancyNumber, setPregnancyNumber] = useState(0)

  const informationEdit = (info = {}, phase = 0, pregnancyNumber = 0) => {
    setFormInfo(info)
    setFormPhase(phase)
    setPregnancyNumber(pregnancyNumber)
    displayForm()
  }

  // Detailed information
  const [detailedInfo, setDetailedInfo] = useState(pregnancies[0] || {})

  const lastComplete = pregnancies[0]?.completed
  const add_update = [
    ['नई', ''],
    ['Add', 'Update'],
  ]

  const phaseStatements = [
    ['नई उथि की जानकारी जोड़ें', 'new Pregnancy'],
    ['Test की जानकारी जोड़ें', 'Examination details'],
    ['छुटाई की तारीख जोड़ें', 'Lactation date'],
    ['ब्याही की जानकारी जोड़ें', 'Delivery information'],
  ]

  return (
    <div className="pregnancy-box h-auto">
      <h2 className="heading2">PREGNANCY</h2>
      <div className="max-h-[344px] overflow-y-auto">
        {pregnancies.map((info, index) => (
          <PregnancyDisplayBrief
            info={info}
            key={index}
            index={index}
            detailedInfo={setDetailedInfo}
          />
        ))}
      </div>
      {detailedInfo && (
        <PregnancyDisplay info={detailedInfo} pregnancyEdit={informationEdit} />
      )}
      <div
        ref={formRef}
        className="h-auto self-center mb-2"
        hidden={!formDisplay}
      >
        <PregnancyForm
          phase={formPhase}
          edit={pregnancyNumber !== 0 || formPhase !== (currentPhase + 1) % 4}
          info={formInfo}
          deliveryNumber={nextDeliveryNumber}
          pregnancyNumber={pregnancyNumber}
          reloadPage={reloadPage}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (formDisplay) {
              hideForms()
              return
            }
            setFormInfo(nextPhaseInfo)
            setFormPhase((currentPhase + 1) % 4)
            setPregnancyNumber(0)
            displayForm()
            setTimeout(() => {
              formRef.current.scrollIntoView({
                behavior: 'smooth',
              })
            }, 0)
          }}
          className="buttons2 w-fit m-2"
        >
          {formDisplay
            ? lang
              ? 'Close form'
              : 'रद्द करें'
            : `${add_update[Number(lang)][Number(lastComplete)]} ${
                phaseStatements[(currentPhase + 1) % 4][Number(lang)]
              }`}
        </button>
      </div>
    </div>
  )
}

export default Pregnancies
