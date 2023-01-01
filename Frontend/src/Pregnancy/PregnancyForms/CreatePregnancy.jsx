import { useContext, useState } from 'react'
import Error from '../../Custom/Error'
import Copulation from './Copulation'
import Delivery from './Delivery'
import Examination from './Examination'
import Lactation from './Lactation'
import { pregnancyStages } from '../../Helpers/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { createPregnancy } from './pregnancyforms'
import Loading from '../../Custom/Loading'
import LanguageContext from '../../LanguageContext'
import { TokenError } from '../../customErrors'
import { logout } from '../../Helpers/helperFunctions'

const renderStage = (stage, formSubmission) => {
  switch (stage) {
    case 'COPULATION':
      return <Copulation formSubmission={formSubmission} />
    case 'EXAMINATION':
      return <Examination formSubmission={formSubmission} />
    case 'LACTATION':
      return <Lactation formSubmission={formSubmission} />
    case 'DELIVERY':
      return <Delivery formSubmission={formSubmission} />
    default:
      return <Error error={'Invalid'} />
  }
}

const CreatePregnancy = ({ closeForm }) => {
  const [lang] = useContext(LanguageContext)
  const { tag } = useParams()

  const navigate = useNavigate()

  const query = useQueryClient()
  const create = useMutation(createPregnancy, {
    onSuccess: (received) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.pregnancies.unshift(received.data)
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
    create.mutate({ data, tag })
  }

  const [stage, setStage] = useState('COPULATION')

  return create.isLoading ? (
    <Loading />
  ) : (
    <div>
      {renderStage(stage, formSubmission)}
      <div className="flex justify-evenly text-center ">
        <button
          className="buttons"
          onClick={() => {
            setStage(
              pregnancyStages[
                (pregnancyStages.indexOf(stage) + 1) % pregnancyStages.length
              ]
            )
          }}
        >
          Skip
        </button>
        <button
          className="buttons"
          onClick={() => {
            closeForm()
          }}
        >
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default CreatePregnancy
