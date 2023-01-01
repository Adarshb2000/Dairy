import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { host } from '../Helpers/config'
import Loading from '../Custom/Loading'
import Disease from './Disease'
import { useEffect, useState } from 'react'
import Diseases from './Diseases'

const DiseaseDetails = () => {
  const { tag } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const getDiseases = async () => {
      const res = await fetch(`${host}/disease/${tag}`)
      const ret = await res.json()
      setData(ret.data)
    }

    getDiseases()
  }, [])

  return (
    <div>
      <Diseases diseases={data} />
    </div>
  )
}

export default DiseaseDetails
