import { useEffect, useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { animalTranslate, displayDate } from './Helper'
import LanguageContext from './LanguageContext'
const PregnancyDisplayBrief = ({ info, detailedInfo, index = 0 }) => {
  const [lang, _] = useContext(LanguageContext)
  info.index = index

  const boxColor =
    info.completed || info.delivery
      ? info.delivery
        ? 'bg-green1'
        : 'bg-red1'
      : 'bg-yellow-500'

  const { ref, inView } = useInView()

  // useEffect(() => {
  //   inView &&
  //     document
  //       .getElementById(`pregnancy${index}`)
  //       .scrollIntoView((alignToTop = true))
  // }, [inView])

  return (
    <button
      id={`pregnancy${index}`}
      onClick={() => detailedInfo(info)}
      className={`${boxColor} h-16 w-full my-1 px-2 rounded-lg flex justify-center items-center text-lg overflow-x-hidden text-white hover:font-bold`}
    >
      {info.delivery ? (
        `${info.delivery.number} ${
          lang ? 'Delivered on' : 'ब्याही'
        } ${displayDate({
          date: info.delivery.date,
          year: '2-digit',
        })} ${animalTranslate(info.delivery.gender, 1)}`
      ) : info.lactation ? (
        `${lang ? 'Lactation date: ' : 'छुटाई'} ${displayDate({
          date: info.lactation.date,
          year: '2-digit',
        })}`
      ) : info.examination ? (
        <span
          className={
            !info.completed
              ? info.examination.isPregnant
                ? 'text-green1'
                : 'text-red1'
              : ''
          }
        >{`TEST ${displayDate({
          date: info.examination.date,
          year: '2-digit',
        })} ${info.examination.doctor ? (lang ? 'Doctor' : 'डॉक्टर') : ''} ${
          info.examination.doctor
        }`}</span>
      ) : info.copulation ? (
        `${lang ? 'Copulation date: ' : 'उथि'} ${displayDate({
          date: info.copulation.date,
        })} ${
          info.copulation.bullNumber
            ? `S.N.(${info.copulation.bullNumber})`
            : ''
        } ${info.copulation.worker ? info.copulation.worker : ''}`
      ) : (
        <></>
      )}
    </button>
  )
}

export default PregnancyDisplayBrief
