import { useContext } from 'react'
import LanguageContext from './LanguageContext'

const DiseaseDisplay = ({ info, informationEdit, diseaseIndex }) => {
  const [lang, _] = useContext(LanguageContext)

  return info.vaccination[0] && Object.keys(info.vaccination[0]).length > 1 ? (
    <div className="flex">
      <div className="w-full flex-column">
        {info.cured ? (
          <div className="bg-colour-green disease-cured">
            OK{' '}
            {new Date(info.vaccination.slice(-1)[0].date).toLocaleDateString(
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
          {info.vaccination.map((ele, vaccineIndex) => (
            <button
              className="pregnancy-box items-center font-semibold divide-y-2 divide-slate-400 bg-colour h-32 m-2 hover:bg-slate-400 border-2 border-slate-400"
              key={vaccineIndex}
              onClick={() => informationEdit(ele, diseaseIndex, vaccineIndex)}
            >
              {ele.vaccine ? (
                <label htmlFor="vaccine">
                  {/* {lang ? 'Vaccine' : 'दवाई'}:&nbsp; */}
                  <span>{ele.vaccine}</span>
                </label>
              ) : (
                <></>
              )}
              {ele.date ? (
                <label htmlFor="date">
                  {/* {lang ? 'Date' : 'दिनांक'}:{' '} */}
                  <span>
                    {new Date(ele.date).toLocaleDateString('hi-IN', {
                      day: 'numeric',
                      month: 'numeric',
                      year: '2-digit',
                    })}
                  </span>
                </label>
              ) : (
                <></>
              )}

              {ele.doctor ? (
                <label htmlFor="doctor">
                  {/* {lang ? 'Doctor' : 'डॉक्टर'}:&nbsp; */}
                  <span>{ele.doctor}</span>
                </label>
              ) : (
                <></>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default DiseaseDisplay
