import { useMutation, useQueryClient } from '@tanstack/react-query'
import Copulation from './Copulation'
import Delivery from './Delivery'
import Examination from './Examination'
import Lactation from './Lactation'
import { editPregnancy } from './pregnancyforms'
import { useNavigate, useParams } from 'react-router-dom'
import { TokenError } from '../../customErrors'

const renderStage = (stage, data, formSubmission) => {
  switch (stage) {
    case 'COPULATION':
      return <Copulation data={data} formSubmission={formSubmission} />
    case 'EXAMINATION':
      return <Examination data={data} formSubmission={formSubmission} />
    case 'LACTATION':
      return <Lactation data={data} formSubmission={formSubmission} />
    case 'DELIVERY':
      return <Delivery data={data} formSubmission={formSubmission} />
    default:
      return 'Hello'
  }
}

const EditPregnancy = ({ stage, data, id, closeForm }) => {
  const { tag } = useParams()
  const navigate = useNavigate()

  const query = useQueryClient()
  const edit = useMutation(editPregnancy, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.pregnancies[
          oldData.data.pregnancies.findIndex((pregnancy) => pregnancy.id === id)
        ] = newData.data
      })
      window.location.reload()

      closeForm()
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        alert(err.message)
        logout(navigate)
      }
    },
  })
  const formSubmission = (editData) => {
    edit.mutate({ data: editData, tag, id })
  }
  return renderStage(stage, data, formSubmission)
}

export default EditPregnancy
