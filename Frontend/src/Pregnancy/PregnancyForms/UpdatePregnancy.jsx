import { useMutation, useQueryClient } from '@tanstack/react-query'
import Error from '../../Custom/Error'
import { pregnancyStages } from '../../Helpers/constants'
import Delivery from './Delivery'
import Examination from './Examination'
import Lactation from './Lactation'
import { updatePregnancy } from './pregnancyforms'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { TokenError } from '../../customErrors'

const renderStage = (stage, lastStageDate, formSubmission) => {
  switch (stage) {
    case 'EXAMINATION':
      return (
        <Examination
          lastStageDate={lastStageDate}
          formSubmission={formSubmission}
        />
      )
    case 'LACTATION':
      return (
        <Lactation
          lastStageDate={lastStageDate}
          formSubmission={formSubmission}
        />
      )
    case 'DELIVERY':
      return (
        <Delivery
          lastStageDate={lastStageDate}
          formSubmission={formSubmission}
        />
      )
    default:
      return <Error error={'Some Error Occured'} />
  }
}

const UpdatePregnancy = ({ pregnancy, closeForm }) => {
  const [lang] = useContext(LanguageContext)
  const { tag } = useParams()
  const navigate = useNavigate()

  const query = useQueryClient()
  const update = useMutation(updatePregnancy, {
    onSuccess: (returnData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.pregnancies[0] = returnData
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

  const nextStage =
    pregnancyStages[pregnancyStages.indexOf(pregnancy.stage) + 1]

  const formSubmission = (data) => {
    update.mutate({ data, id: pregnancy.id, tag })
  }

  return (
    <div>
      {renderStage(
        nextStage,
        pregnancy[pregnancy.stage.toLowerCase()].date,
        formSubmission
      )}
      <div className="text-center">
        <button onClick={() => closeForm()} className="buttons">
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default UpdatePregnancy
