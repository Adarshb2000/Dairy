import { useMutation, useQueryClient } from '@tanstack/react-query'
import Copulation from './Copulation'
import Delivery from './Delivery'
import Examination from './Examination'
import Lactation from './Lactation'
import { editPregnancy, unAbortPregnancy } from './pregnancyforms'
import { useNavigate, useParams } from 'react-router-dom'
import { TokenError } from '../../customErrors'
import { useContext } from 'react'
import LanguageContext from '../../LanguageContext'

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
  const [lang] = useContext(LanguageContext)
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

  const unAbort = useMutation(unAbortPregnancy, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.pregnancies.shift()
        oldData.data.pregnancies.unshift(newData.data)
        window.location.reload()
        closeForm()
      })
    },
  })

  const formSubmission = (editData) => {
    edit.mutate({ data: editData, tag, id })
  }
  return (
    <div>
      {renderStage(stage, data, formSubmission)}
      <div className="flex justify-evenly">
        {id === query.getQueryData([tag, tag]).data.pregnancies[0].id &&
        query.getQueryData([tag, tag]).data.pregnancies[0].aborted ? (
          <button
            className="rounded-3xl bg-green1 p-2"
            onClick={() => {
              unAbort.mutate({ tag, id })
            }}
          >
            Un Abort
          </button>
        ) : null}
        <button onClick={() => closeForm()} className="buttons">
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default EditPregnancy
