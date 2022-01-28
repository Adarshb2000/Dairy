import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import { logout } from './Helper'
import { api } from './config'
import DiseaseForm from './DiseaseForm'
import AddMilkRecord from './AddMilkRecord'

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
  const [addMilk, setAddMilk] = useState(true)
  const details = useRef(null)

  const navigate = useNavigate()

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
      console.log(details.current)
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        alert(e.message)
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
    <div>
      <h1>
        Tag number: {animal} {details.current.tag}
      </h1>
      <h2>
        {new Date(details.current.purchaseDate).toLocaleDateString('hi-IN', {
          month: 'long',
          year: 'numeric',
        })}{' '}
        {details.current.seller} ki {details.current.vehicleNumber}N aayi
      </h2>

      <button onClick={() => setAddDisease(!addDisease)}>
        Add/Update disease
      </button>
      <div hidden={addDisease}>
        <DiseaseForm disease={false} />
      </div>
      <br />
      <button onClick={() => setAddMilk(!addMilk)}>Add Milk</button>
      <div hidden={addMilk}>
        <AddMilkRecord />
      </div>
    </div>
  )
}

export default SearchRecord
