import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createForm } from './createForm'
import { useNavigate, useParams } from 'react-router-dom'
import DiseaseForm from '../DiseaseForm'
import { TokenError } from '../../customErrors'

const DiseaseCreateForm = ({ closeForm }) => {
  const { tag } = useParams()
  const navigate = useNavigate()

  const query = useQueryClient()
  const createDisease = useMutation(createForm, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.diseases.unshift(newData.data)
      })
      closeForm()
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        alert(err.message)
        logout(navigate)
      }
    },
  })

  const formSubmission = (data) => {
    createDisease.mutate({ data, tag })
  }

  return (
    <div className="mb-1">
      <DiseaseForm formSubmission={formSubmission} />
    </div>
  )
}

export default DiseaseCreateForm
