import { useContext, useState } from 'react'
import LanguageContext from '../LanguageContext'
import {
  animalTranslate,
  displayDate,
  romanize,
} from '../Helpers/helperFunctions'
import PregnancyDisplay from './PregnancyDisplay'

const Copulation = ({ data, lang }) => {
  return `${lang ? 'Copulation date: ' : 'उठी'} ${displayDate({
    date: data.date,
  })} ${data.bull ? `${data.bull}` : ''} ${data.worker ? data.worker : ''}`
}

const Examination = ({ data, lang }) => {
  return (
    <span>{`TEST ${displayDate({
      date: data.date,
      year: '2-digit',
    })} ${data.doctor ? (lang ? 'Doctor' : 'डॉक्टर') : ''} ${data.doctor} ${
      data.duration ? `${data.duration} ${lang ? 'months' : 'माह'}` : null
    }`}</span>
  )
}

const Lactation = ({ data, lang }) => {
  return `${lang ? 'Lactation date: ' : 'छुटाई'} ${displayDate({
    date: data.date,
    year: '2-digit',
  })}`
}

const Delivery = ({ data, lang }) => {
  return (
    <>
      <span className="mr-2 text-3xl font-bold">{romanize(data.number)}</span>
      {lang ? 'Delivered on ' : 'ब्याही '}
      {displayDate({
        date: data.date,
        year: '2-digit',
      })}
      &nbsp;
      {animalTranslate(data.gender, 1)}
    </>
  )
}

const renderStage = ({ stage, data, lang }) => {
  switch (stage) {
    case 'COPULATION':
      return <Copulation data={data} lang={lang} />
    case 'EXAMINATION':
      return <Examination data={data} lang={lang} />
    case 'LACTATION':
      return <Lactation data={data} lang={lang} />
    case 'DELIVERY':
      return <Delivery data={data} lang={lang} />
    default:
      return 'Hello'
  }
}

const PregnancySummary = ({ pregnancy }) => {
  const [lang] = useContext(LanguageContext)

  const [detailedView, showDetailedView] = useState(false)

  const boxColor =
    pregnancy.completed || pregnancy.stage === 'DELIVERY'
      ? pregnancy.stage === 'DELIVERY'
        ? 'bg-green1'
        : 'bg-red-600'
      : 'bg-amber-400'
  return (
    <div>
      <button
        id={pregnancy.id}
        className={`${boxColor} bg- my-1 flex h-16 w-full items-center justify-center overflow-x-hidden rounded-lg px-2 text-lg text-white hover:font-bold`}
        onClick={() => {
          showDetailedView(!detailedView)
        }}
      >
        {renderStage({
          stage: pregnancy.stage,
          data: pregnancy[pregnancy.stage.toLowerCase()],
          lang: lang,
        })}
      </button>
      {detailedView ? <PregnancyDisplay data={pregnancy} /> : null}
    </div>
  )
}

export default PregnancySummary
