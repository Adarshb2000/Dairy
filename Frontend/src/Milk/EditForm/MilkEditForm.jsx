import { useMutation } from '@tanstack/react-query'
import MilkForm from '../MilkForm'
import { deleteMilk, milkEdit } from './milkEdit'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Custom/Loading'
import { useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { TokenError } from '../../customErrors'

const MilkEditForm = ({ id, data, closeForm }) => {
  const [lang] = useContext(LanguageContext)
  const { tag } = useParams()
  const navigate = useNavigate()

  const result = useMutation(milkEdit, {
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
  const deleteRecord = useMutation(deleteMilk, {
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
    result.mutate({ tag, data, id })
  }
  return result.isLoading ? (
    <Loading />
  ) : (
    <div>
      <MilkForm data={data} formSubmission={formSubmission} />
      <div className="mt-2 flex justify-evenly">
        <button
          onClick={() => {
            deleteRecord.mutate({ tag, id })
          }}
          className="delete-button"
        >
          {lang ? 'Delete' : 'रिकॉर्ड हटाएं'}
        </button>
        <button className="buttons" onClick={() => closeForm()}>
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default MilkEditForm
