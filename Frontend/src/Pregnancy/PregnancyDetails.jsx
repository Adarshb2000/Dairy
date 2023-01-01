import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { host } from '../Helpers/config'
import Pregnancies from './Pregnancies'

const PregnancyDetails = () => {
  const { tag } = useParams()
  const [data, setData] = useState()
  useEffect(() => {
    fetch(`${host}/pregnancy/${tag}`)
      .then((data) => data.json())
      .then((data) => setData(data.data))
  }, [])
  return <Pregnancies pregnancies={data || []} />
}

export default PregnancyDetails
