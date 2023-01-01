import { useContext } from 'react'
import LanguageContext from '../LanguageContext'
import SelectElement from '../Custom/SelectElement'
import { animals } from '../Helpers/constants'
import {
  animalTranslate,
  generateTag,
  logout,
} from '../Helpers/helperFunctions'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [lang, setLang] = useContext(LanguageContext)
  const navigate = useNavigate()

  const formSubmit = async (e) => {
    //search for a record
    e.preventDefault()
    const tag = generateTag(
      Object.fromEntries(new FormData(e.target).entries())
    )
    navigate(`/${tag}`, { replace: true })
  }

  return false ? (
    <>Hello</>
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
              name="tag"
              type="number"
              min={1}
              required={true}
            />
          </label>
        </div>
        <button className="buttons" type="submit">
          {lang ? 'Search' : 'खोजें'}
        </button>
        <div className="h-0 w-full border-t-2 border-grey1"></div>
        <div className="responsive-box my-4">
          <Link to={'/new-record'} className="buttons2 h-fit w-fit">
            {lang ? 'Add New Record' : 'नया रिकॉर्ड जोड़ें'}
          </Link>
        </div>
        <div className="h-0 w-full border-t-2 border-grey1"></div>
        <div className="responsive-box justify-evenly p-2">
          <button
            type="button"
            className="buttons2 my-2 h-fit w-fit"
            onClick={() => {
              logout(navigate)
            }}
          >
            logout
          </button>
          <button
            className="buttons2 my-2 w-fit"
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
