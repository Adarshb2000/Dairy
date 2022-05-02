import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  animals,
  animalTranslate,
  authorization,
  fetchDetails,
  logDetails,
  logout,
  objectForSubmission,
} from './Helper'
import { Oval } from 'react-loader-spinner'
import { TokenError } from './CustomErrors'
import LanguageContext from './LanguageContext'
import SelectElement from './SelectElement'

const Home = () => {
  // Basic
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useContext(LanguageContext)
  const navigate = useNavigate()

  // Form elements
  const [tag, setTag] = useState('')

  const formSubmit = async (e) => {
    //search for a record
    e.preventDefault()
    var { animal } = objectForSubmission(e.target)
    if (animal && tag) {
      navigate(`/${animal}/${tag}`, { replace: true })
    } else if (!animal) {
      alert('invalid animal')
    } else {
      alert('invalid tag number')
    }
  }

  const verifyToken = async () => {
    try {
      await authorization()
      setLoading(false)
    } catch (e) {
      if (e instanceof TokenError) {
        logout()
        navigate('/login')
      } else {
        alert('Contact the maker')
        console.log(e)
      }
    }
  }

  useEffect(verifyToken, [])

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
  ) : (
    <div className="wrapper extra-short">
      <form className="home-container" onSubmit={formSubmit}>
        <h4 className="heading1">
          {' '}
          {lang ? 'SEARCH RECORD' : 'रिकॉर्ड खोजें'}{' '}
        </h4>
        <div className="responsive-box min-h-[80px]">
          <SelectElement
            name="animal"
            label={lang ? 'Animal:' : 'जानवर:'}
            required={true}
            options={animals.map((animal) => [
              animalTranslate(animal, 0, lang),
              animal,
            ])}
            className="inputs"
            defaultValue={'buffalo'}
          />
          <label htmlFor="tag">
            {lang ? 'Tag Number' : 'टैग संख्या'}:
            <input
              className="inputs w-20"
              onChange={(e) => setTag(e.target.value)}
              name="tag"
              value={tag}
              type="number"
              min={1}
              required={true}
            />
          </label>
        </div>
        <button className="buttons" type="submit">
          {lang ? 'Search' : 'खोजें'}
        </button>
        <div className="border-t-2 border-grey1 w-full h-0"></div>
        <div className="responsive-box my-4">
          <Link to={'/new-record'} className="buttons2 h-fit w-fit">
            {lang ? 'Add New Record' : 'नया रिकॉर्ड जोड़ें'}
          </Link>
        </div>
        <div className="border-t-2 border-grey1 w-full h-0"></div>
        <div className="responsive-box justify-evenly p-2">
          <button
            className="buttons2 h-fit w-fit my-2"
            onClick={() => {
              logout(navigate)
            }}
          >
            logout
          </button>
          <button
            className="buttons2 w-fit my-2"
            onClick={() => {
              setLang(!lang)
            }}
            type="button"
          >
            Change Language
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
