import { useMutation, useQueryClient } from '@tanstack/react-query'
import DiseaseForm from '../DiseaseForm'
import { deleteForm, editForm } from './editForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { TokenError } from '../../customErrors'

const DiseaseEditForm = ({ data, id, closeForm }) => {
  const [lang] = useContext(LanguageContext)
  const { tag } = useParams()
  const navigate = useNavigate()

  const editVaccine = useMutation(editForm, {
    onSuccess: () => {
      window.location.reload()
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        alert(err.message)
        logout(navigate)
      }
    },
  })
  const deleteVaccine = useMutation(deleteForm, {
    onSuccess: () => {
      window.location.reload()
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        alert(err.message)
        logout(navigate)
      }
    },
  })

  const formSubmission = (data) => {
    editVaccine.mutate({ data, id, tag })
  }

  return (
    <div>
      <DiseaseForm formSubmission={formSubmission} data={data} />
      <div className="flex justify-evenly">
        <button
          className="delete-button"
          onClick={() => {
            deleteVaccine.mutate({ tag, id })
          }}
        >
          {lang ? 'Delete' : 'Delete'}
        </button>
        <button className="buttons" onClick={() => closeForm()}>
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default DiseaseEditForm
