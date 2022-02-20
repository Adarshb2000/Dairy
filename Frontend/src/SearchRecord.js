import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import { logout } from './Helper'
import { api } from './config'
import DiseaseForm from './DiseaseForm'
import MilkForm from './MilkForm'

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

const SearchRecord = () => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(true)
  const [addDisease, setAddDisease] = useState(true)
  const [isCured, setIsCured] = useState(true)
  const [addMilk, setAddMilk] = useState(true)
  const details = useRef(null)

  const navigate = useNavigate()

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
      setIsCured(details.current.disease.slice(-1)[0].cured)
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate('/', { replace: true })
      } else if (e instanceof TokenError) {
        logout(navigate)
      }
    }
  }

  useEffect(() => {
    fetchDet()
  }, [])

  return loading ? (
    <>Loading</>
  ) : (
    <div className="wrapper">
      <div className="box0 box0-center bigbox w-5/6 overflow-y-scroll h-auto bg-white">
        <h1>
          Tag number: {animal} {details.current.tag}
        </h1>
        <h2>
          {new Date(details.current.purchaseDate).toLocaleDateString('hi-IN', {
            month: 'long',
            year: 'numeric',
          })}
          {details.current.seller} ki {details.current.vehicleNumber}N aayi
        </h2>
        <div className="flex flex-col items-center">
          {JSON.stringify(details.current.disease.slice(-1))}
          <button
            onClick={() => setAddDisease(!addDisease)}
            className="buttons2"
          >
            {isCured ? 'Add' : 'Update'} disease
          </button>
          <div className="h-auto" hidden={addDisease}>
            <DiseaseForm disease={isCured} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="buttons2 w-24"
            onClick={() => setAddMilk(!addMilk)}
          >
            Add Milk
          </button>
          <div className="h-auto" hidden={addMilk}>
            <MilkForm />
          </div>
        </div>
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  )
}

export default SearchRecord
