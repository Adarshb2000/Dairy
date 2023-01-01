import { useEffect, useState } from 'react'
import { host } from '../Helpers/config'
import { useParams } from 'react-router-dom'
import Milk from './Milk'

const MilkDetails = () => {
  const [details, setDetails] = useState([])
  const { tag } = useParams()
  useEffect(() => {
    const getMilkDetails = async () => {
      const res = await fetch(`${host}/milk/${tag}`)
      setDetails((await res.json()).data)
    }
    getMilkDetails()
  }, [])
  return details.length ? <Milk data={details} /> : <h1>No details</h1>
}

export default MilkDetails
