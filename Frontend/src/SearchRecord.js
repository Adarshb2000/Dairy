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
  const details = useRef(null)

  const navigate = useNavigate()

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
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
      <h1>Search record</h1>
      {Object.entries(details.current).map(([key, value], index) => (
        <p key={index}>
          {key.toLocaleUpperCase()}{' '}
          {key === 'disease' || key === 'pregnancy'
            ? JSON.stringify(value[value.length - 1])
            : JSON.stringify(value)}
        </p>
      ))}
      <DiseaseForm disease={false} />
      <AddMilkRecord />
    </div>
  )
}

export default SearchRecord
