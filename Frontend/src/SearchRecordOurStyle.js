import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PregnancyDisplay from './PregnancyDisplay'
import { DataBaseError, TokenError } from './CustomErrors'
import { logout } from './Helper'
import { api } from './config'
import DiseaseForm from './DiseaseForm'
import MilkForm from './MilkForm'
import DiseaseDisplay from './DiseaseDisplay'
import MilkDisplay from './MilkDisplay'
import PregnancyForm from './PregnancyForm'

const fetchDetails = async (animal, tag) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${api}/${animal}/${tag}`, {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  })
  if (res.ok) {
    const ret = await res.json()
    return ret
  } else {
    if (res.status === 404) {
      throw new DataBaseError(res.message)
    } else if (res.status === 500) {
      alert('Contact the maker')
    } else {
      throw new TokenError(res.message)
    }
  }
}

const SearchRecordOurStyle = () => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(true)
  const [addDisease, setAddDisease] = useState(true)
  const [isCured, setIsCured] = useState(true)
  const [addMilk, setAddMilk] = useState(true)
  const details = useRef(null)
  const [preg, setPreg] = useState([])
  const [disease, setDisease] = useState([])
  const [milkDisplay, setMilkDisplay] = useState(5)
  const [milk, setMilk] = useState([])
  const [addPregnancy, setAddPregnancy] = useState(true)
  const [isPregnant, setIsPregnant] = useState(true)

  const navigate = useNavigate()

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
      console.log(details.current)
      setIsPregnant(
        !(
          !details.current.pregnancy.length ||
          details.current.pregnancy.slice(-1)[0].completed
        )
      )
      setIsCured(
        !details.current.disease.length ||
          details.current.disease.slice(-1)[0]?.cured
      )
      setPreg(details.current.pregnancy.slice(-1))
      setDisease(details.current.disease.slice(-1))
      setMilk(details.current.milk.reverse())
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate('/', { replace: true })
      } else if (e instanceof TokenError) {
        logout(navigate)
      } else console.log(e)
    }
  }

  useEffect(() => {
    fetchDet()
  }, [])

  return loading ? (
    <>Loading</>
  ) : (
    <div className="wrapper overflow-auto">
      <div className="flex flex-col h-screen bg-white sm:w-5/6 mt-8 rounded-xl w-screen">
        <div className="flex relative justify-center py-2">
          <div className="heading0 self-end mt-4">{animal.toUpperCase()}</div>
          <div className="absolute right-6 text-7xl font-bold text-red1">
            {details.current.tag}
          </div>
        </div>
        <div className="flex flex-col justify-evenly px-8 bigbox justifying-start overflow-x-hidden overflow-y-scroll w-auto ">
          <div className="pregnancy-box h-48">
            <h2 className="heading2">PURCHASE</h2>
            <div className="pregnancy-box bg-colour h-24 m-2">
              <label htmlFor="date">
                Date:{' '}
                <span>
                  {new Date(details.current.purchaseDate).toLocaleDateString(
                    'hi-IN',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </span>
              </label>
              <label htmlFor="seller">
                Seller: <span>{details.current.seller}</span>
              </label>
              <label htmlFor="vehicleNumber">
                Vehicle Number: <span>{details.current.vehicleNumber}</span>
              </label>
            </div>
          </div>
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">PREGNANCY</h2>
            <div className="divide-y-4 divide-white">
              {preg.map((ele, index) => (
                <PregnancyDisplay info={ele} key={index} />
              ))}
            </div>
            <div className="h-auto self-center" hidden={addPregnancy}>
              <PregnancyForm
                lastPregnancy={
                  isPregnant ? details.current.pregnancy.slice(-1)[0] : false
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setPreg(
                    preg.length === 1
                      ? details.current.pregnancy
                      : details.current.pregnancy.slice(-1)
                  )
                  scrollTo({ top: 0 })
                }}
                hidden={!(details.current.pregnancy.length > 1)}
                className="buttons w-44 self-center"
              >
                {preg.length > 1 ? 'hide' : 'show all'}
              </button>
              <button
                onClick={() => setAddPregnancy(!addPregnancy)}
                className="buttons2 w-auto m-2"
              >
                {!isPregnant ? 'Add' : 'Update'} Pregnancy
              </button>
              <Link
                to={`/add-complete-pregnancy/${animal}/${tag}`}
                className="buttons2 w-auto m-2"
              >
                Add complete pregnancy
              </Link>
            </div>
          </div>
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">DISEASE</h2>
            <div className="divide-y-4 divide-white">
              {disease.map((ele, index) =>
                ele.vaccination.length ? (
                  <DiseaseDisplay info={ele} key={index} />
                ) : (
                  <></>
                )
              )}
            </div>
            <div className="h-auto self-center" hidden={addDisease}>
              <DiseaseForm disease={isCured} />
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setDisease(
                    disease.length === 1
                      ? details.current.disease
                      : details.current.disease.slice(-1)
                  )
                  scrollTo({ top: 0 })
                }}
                hidden={!(details.current.disease.length > 1)}
                className="buttons w-44 m-2"
              >
                {disease.length > 1 ? 'hide' : 'show all'}
              </button>
              <button
                onClick={() => setAddDisease(!addDisease)}
                className="buttons2 w-auto m-2"
              >
                {isCured ? 'Add' : 'Update'} disease
              </button>
            </div>
          </div>
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">MILK RECORD</h2>
            <MilkDisplay info={milk.slice(0, milkDisplay)} />
            <div className="h-auto self-center" hidden={addMilk}>
              <MilkForm />
            </div>
            <div className="flex justify-center">
              <button
                hidden={!details.current.milk.length}
                className="buttons2 w-28 m-2"
                onClick={() => {
                  if (milkDisplay >= milk.length) setMilkDisplay(5)
                  else setMilkDisplay(milkDisplay + 5)
                }}
              >
                {milkDisplay >= milk.length ? 'Show Less' : 'Show more'}
              </button>
              <button
                className="buttons2 w-24 m-2"
                onClick={() => setAddMilk(!addMilk)}
              >
                Add Milk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchRecordOurStyle
