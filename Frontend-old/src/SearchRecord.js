import { useContext, useEffect, useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import BasicInformation from './BasicInformation'
import { DataBaseError, TokenError } from './CustomErrors'
import DeleteButton from './DeleteButton'
import Diseases from './Diseases'
import { logout, fetchDetails, animalTranslate, animals } from './Helper'
import LanguageContext from './LanguageContext'
import Milk from './Milk'
import Pregnancies from './Pregnancies'

const SearchRecord = () => {
  // Basic
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(true)
  const reloadPage = () => setLoading(true)
  const navigate = useNavigate()
  const [lang, setLang] = useContext(LanguageContext)

  // Refs
  const pregnanciesRef = useRef(null)
  const diseasesRef = useRef(null)
  const milkRef = useRef(null)
  const scrollToSegment = useLocation().hash.replace('#', '')
  const refs = {
    pregnancies: pregnanciesRef,
    diseases: diseasesRef,
    milk: milkRef,
  }
  const executeScroll = (ref) =>
    ref.current.scrollIntoView({ behavior: 'smooth' })

  // Details
  const details = useRef(null)

  // Forms & formDisplays
  const forms = []
  const hideForms = () => {
    forms.forEach((form) => form(0))
  }

  const fetchDet = async () => {
    if (animals.indexOf(animal) === -1 || isNaN(tag)) {
      alert('invalid!!!')
      navigate('/', { replace: true })
      return
    }
    try {
      details.current = await fetchDetails(animal, tag)
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        setLoading(false)
      } else if (e instanceof TokenError) {
        logout(navigate)
      } else console.log(e)
    }
  }

  useEffect(() => {
    if (loading) fetchDet()
    else
      scrollToSegment &&
        setTimeout(() => executeScroll(refs[scrollToSegment]), 100)
  }, [loading])

  return loading ? (
    <div className="wrapper">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={1}
        strokeWidthSecondary={1}
        color="red"
        secondaryColor={'white'}
      />
      <span className="heading1">Loading...</span>
    </div>
  ) : details.current ? (
    <div className="flex justify-center w-screen h-screen bg-grey0">
      <div className="search-record-container medium">
        <div className="flex relative justify-center py-2 rounded-xl bg-gray-300">
          <div
            className="heading0 self-end my-3"
            onClick={() => {
              navigate('/', { replace: true })
            }}
          >
            {animalTranslate(animal, 0, lang)}
          </div>
          <div className="absolute right-6 text-7xl font-bold text-red1">
            {details.current.tag}
          </div>
        </div>
        <div className="flex-column justify-start px-3.5 sm:px-8 h-auto max-h-screen overflow-y-auto">
          <div>
            <BasicInformation information={details.current.information} />
          </div>
          <div ref={pregnanciesRef}>
            <Pregnancies
              pregnancies={details.current.pregnancies}
              forms={forms}
              deliveries={details.current.deliveries}
              hideForms={hideForms}
              reloadPage={reloadPage}
            />
          </div>
          <div ref={diseasesRef}>
            <Diseases
              diseases={details.current.diseases}
              forms={forms}
              hideForms={hideForms}
              reloadPage={reloadPage}
            />
          </div>
          <div ref={milkRef}>
            <Milk
              milk={details.current.milk}
              forms={forms}
              hideForms={hideForms}
              reloadPage={reloadPage}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-evenly items-center bg-rose-200 rounded-lg px-4 py-3 my-2 h-auto">
            <Link to={'/'} className="buttons w-24 min-w-fit m-2">
              &larr; Go back
            </Link>
            <DeleteButton
              subRoute={`/delete-tag/${animal}/${tag}`}
              navigate={() => navigate('/', { replace: true })}
              alertDialog={`Are you sure you want to delete ${animal} ${tag}`}
              text="Delete Tag"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="flex rounded-xl bg-white p-4">
        <div className="pregnancy-box h-auto">
          <h4 className="heading1">
            {`${animalTranslate(animal, 0, lang)} ${tag} ${
              lang ? 'Record not found' : 'का रिकॉर्ड नहीं मिला'
            }`}
          </h4>
          <div className="flex justify-evenly">
            <Link
              to={`/new-record/${animal}/${tag}`}
              className="buttons w-max self-center"
            >
              {lang ? 'Add it' : 'इसे जोड़ें'}!
            </Link>
            <Link
              to={`/`}
              replace={true}
              className="buttons min-w-fit self-center"
            >
              {lang ? 'Go Back' : 'वापस जाएं'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchRecord
