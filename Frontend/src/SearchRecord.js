import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BasicInformation from './BasicInformation'
import { DataBaseError, TokenError } from './CustomErrors'
import Diseases from './Diseases'
import { logout, fetchDetails, animalTranslate } from './Helper'
import LanguageContext from './LanguageContext'
import Milk from './Milk'
import Pregnancies from './Pregnancies'

const SearchRecord = () => {
  // Basic
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [lang, setLang] = useContext(LanguageContext)

  // Details
  const details = useRef(null)

  // Forms & formDisplays
  const forms = []
  const hideForms = () => {
    forms.forEach((form) => form(0))
  }

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
      console.log(details.current)
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        setLoading(false)
      } else if (e instanceof TokenError) {
        logout(navigate)
      } else console.log(e)
    }
  }

  useEffect(fetchDet, [])

  return loading ? (
    <>Loading</>
  ) : details.current ? (
    <div className="flex justify-center w-screen h-screen bg-grey0">
      <div className="search-record-container medium">
        <div className="flex relative justify-center py-2 rounded-xl bg-gray-300">
          <div className="heading0 self-end my-3">
            {lang ? animal.toUpperCase() : animalTranslate(animal)}
          </div>
          <div className="absolute right-6 text-7xl font-bold text-red1">
            {details.current.tag}
          </div>
        </div>
        <div className="flex-column justify-start px-3.5 sm:px-8 h-auto max-h-screen overflow-y-auto">
          <div>
            <BasicInformation information={details.current.information} />
          </div>
          <div>
            <Pregnancies
              pregnancies={details.current.pregnancies}
              forms={forms}
              deliveries={details.current.deliveries}
              hideForms={hideForms}
            />
          </div>
          <div>
            <Diseases
              diseases={details.current.diseases}
              forms={forms}
              hideForms={hideForms}
            />
          </div>
          <div>
            <Milk
              milk={details.current.milk}
              forms={forms}
              hideForms={hideForms}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="flex rounded-xl bg-white p-4">
        <div className="pregnancy-box h-auto">
          <h4 className="heading1">Record not found</h4>
          <div className="flex justify-evenly">
            <Link
              to={`/new-record/${animal}/${tag}`}
              className="buttons w-max self-center"
            >
              Add it!
            </Link>
            <Link to={`/`} replace={true} className="buttons w-max self-center">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchRecord
