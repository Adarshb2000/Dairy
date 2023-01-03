import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addVaccineForm } from './createForm'
import { useNavigate, useParams } from 'react-router-dom'
import DiseaseForm from '../DiseaseForm'
import { nearToday } from '../../Helpers/helperFunctions'

const VaccineCreateForm = ({
  data: { date, vaccine, cured, doctor, diseaseId },
  closeForm,
}) => {
  const { tag } = useParams()
  const navigate = useNavigate()

  const query = useQueryClient()
  const addVaccine = useMutation(addVaccineForm, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.diseases[0].vaccination.push(newData.data)
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

  let tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() + 4)
  date = nearToday(tempDate, 1) ? new Date() : tempDate

  const formSubmission = (data) => {
    addVaccine.mutate({ data, tag, id: diseaseId })
  }

  return (
    <div className="mb-1">
      <DiseaseForm
        formSubmission={formSubmission}
        data={{ date, vaccine, cured, doctor }}
      />
    </div>
  )
}

export default VaccineCreateForm
