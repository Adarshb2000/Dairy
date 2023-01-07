import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTagDetails } from './tagDetails'
import Loading from '../Custom/Loading'
import Error from '../Custom/Error'
import Pregnancies from '../Pregnancy/Pregnancies'
import Diseases from '../Disease/Diseases'
import Milk from '../Milk/Milk'
import { DataBaseError, TokenError } from '../customErrors'
import { animalTranslate, logout } from '../Helpers/helperFunctions'
import { useContext } from 'react'
import LanguageContext from '../LanguageContext'
import Navbar from '../Navbar'
import Comments from '../Comment/Comments'

const SearchRecord = () => {
  const { tag } = useParams()
  const [lang] = useContext(LanguageContext)
  const navigate = useNavigate()

  const result = useQuery([tag, tag], getTagDetails, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        logout(navigate)
      }
    },
  })

  return result.isLoading ? (
    <Loading />
  ) : result.isError ? (
    result.error instanceof DataBaseError ? (
      <div className="wrapper">
        <div className="flex rounded-xl bg-white p-4">
          <div className="pregnancy-box h-auto">
            <h4 className="heading1">
              {`${animalTranslate(
                tag[0] === 'C' ? 'Cow' : 'Buffalo',
                0,
                lang
              )} ${tag.split('-')[1]} ${
                lang ? 'Record not found' : 'का रिकॉर्ड नहीं मिला'
              }`}
            </h4>
            <div className="flex justify-evenly">
              <Link
                to={`/new-record/${tag}`}
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
    ) : (
      <div>
        {result.error.message}
        <Error error={result.error} />
      </div>
    )
  ) : (
    <div className="flex flex-col items-center overflow-y-auto">
      <Navbar>
        <Link
          to={`/edit-record/${tag}`}
          className="max-w-sm rounded-lg bg-rose-500 p-1 text-white hover:border hover:border-rose-500 hover:bg-white hover:text-black"
        >
          {result.data.data.information}
        </Link>
        <span className="absolute top-0 right-0 p-2 text-7xl font-bold">
          {tag.split('-')[1]}
        </span>
      </Navbar>
      <div className="w-full max-w-3xl">
        <Pregnancies pregnancies={result.data.data.pregnancies} />
      </div>
      <div className="w-full max-w-3xl">
        <Diseases diseases={result.data.data.diseases} />
      </div>
      <div className="w-full max-w-3xl">
        <Milk data={result.data.data.milks} />
      </div>

      <div className="w-full max-w-3xl">
        <Comments comments={result.data.data.comments} />
      </div>
    </div>
  )
}

export default SearchRecord
