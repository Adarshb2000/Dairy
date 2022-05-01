import { useState, useRef, useEffect, useContext } from 'react'
import DiseaseDisplay from './DiseaseDisplay'
import DiseaseForm from './DiseaseForm'
import { useScrollDirection } from 'react-use-scroll-direction'
import { nearToday } from './Helper'
import LanguageContext from './LanguageContext'

const Diseases = ({ diseases = [], forms = [], hideForms = () => {} }) => {
  // Basic
  const [lang, _] = useContext(LanguageContext)

  // Form Display
  const [formDisplay, setFormDisplay] = useState(false)
  forms.push(setFormDisplay)
  const displayForm = () => {
    hideForms()
    setTimeout(() => setFormDisplay(true), 0)
  }

  // Form rest
  const [formInfo, setFormInfo] = useState({})
  const [diseaseIndex, setDiseaseIndex] = useState(0)
  const [vaccineIndex, setVaccineIndex] = useState(0)
  const currentState = diseases.length ? diseases[0].cured : true
  const [diseaseMode, setDiseaseMode] = useState(-1)

  const nextVaccineInfo = {}
  if (!currentState) {
    const lastVaccine = diseases[0].vaccination.slice(-1)[0]
    nextVaccineInfo.vaccine = lastVaccine.vaccine
    nextVaccineInfo.doctor = lastVaccine.doctor
    nextVaccineInfo.date = new Date(lastVaccine.date)
    nextVaccineInfo.date.setDate(nextVaccineInfo.date.getDate() + 3)
    // if (nearToday(nextVaccineInfo.date, new Date(), 5))
    //   nextVaccineInfo.date = new Date()
  }

  const informationEdit = (info, diseaseIndex = 0, vaccineIndex = 0) => {
    setFormInfo(info)
    setDiseaseIndex(diseaseIndex)
    setVaccineIndex(vaccineIndex)
    setDiseaseMode(2)
    setTimeout(() => displayForm(), 0)
  }

  return (
    <div className="pregnancy-box h-auto">
      <h2 className="heading2">{lang ? 'DISEASE' : 'दवाई'}</h2>
      <div
        className="divide-y-4 max-h-[199px] overflow-y-auto divide-white"
        onScroll={(e) => {
          e.preventDefault()
        }}
        id={'diseasesDiv'}
      >
        {diseases.map((ele, index) =>
          ele.vaccination.length ? (
            <DiseaseDisplay
              info={ele}
              key={index}
              diseaseIndex={index}
              informationEdit={informationEdit}
            />
          ) : (
            <></>
          )
        )}
      </div>
      {formDisplay ? (
        <div className="h-auto self-center">
          <DiseaseForm
            mode={diseaseMode}
            info={formInfo}
            diseaseIndex={diseaseIndex}
            vaccineIndex={vaccineIndex}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => {
            setDiseaseMode(currentState ? 0 : 1)
            setFormInfo(nextVaccineInfo)
            displayForm()
          }}
          className="buttons2 w-auto m-2"
        >
          {lang
            ? currentState
              ? 'Add new Disease'
              : 'Add vaccine'
            : currentState
            ? 'नई दवाई डालें'
            : 'दवाई जोड़ें'}
        </button>
      </div>
    </div>
  )
}

export default Diseases
