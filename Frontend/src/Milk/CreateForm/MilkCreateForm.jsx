import { useMutation, useQueryClient } from '@tanstack/react-query'
import MilkForm from '../MilkForm'
import milkCreate from './milkCreate'
import Loading from '../../Custom/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import SelectElement from '../../Custom/SelectElement'
import { useContext } from 'react'
import LanguageContext from '../../LanguageContext'
import { animals } from '../../Helpers/constants'
import { animalTranslate, nearToday } from '../../Helpers/helperFunctions'
import { TokenError } from '../../customErrors'

const MilkCreateForm = ({ data, closeForm }) => {
  const { tag } = useParams()
  const [lang] = useContext(LanguageContext)

  const navigate = useNavigate()

  const query = useQueryClient()
  const result = useMutation(milkCreate, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.milks.unshift(newData.data)
      })
      closeForm()
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        alert(err.message)
        logout(navigate)
        closeForm()
      }
    },
  })

  const autoFillData = {
    date: new Date(data.date || Date()),
    lineNumber: data.lineNumber,
    milk: data.milk,
  }
  if (data.date) {
    autoFillData.date.setMonth(autoFillData.date.getMonth() + 1)
  }
  if (nearToday(autoFillData.date, 10)) autoFillData.date = new Date()

  const formSubmission = (data) => {
    result.mutate({ tag: tag, data: data })
  }

  return result.isLoading ? (
    <Loading />
  ) : (
    <div>
      {!tag ? (
        <div>
          <form>
            <div className="responsive-box min-h-[80px]">
              <SelectElement
                name="animal"
                label={lang ? 'Animal:' : 'जानवर:'}
                required={true}
                options={animals.map((animal) => [
                  animalTranslate(animal, 0, lang),
                  animal,
                ])}
                className="inputs"
                defaultValue={'buffalo'}
              />
              <label htmlFor="tag">
                {lang ? 'Tag Number' : 'टैग संख्या'}:
                <input
                  className="inputs w-20"
                  name="tag"
                  type="number"
                  min={1}
                  required={true}
                />
              </label>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <MilkForm formSubmission={formSubmission} data={autoFillData} />
    </div>
  )
}

export default MilkCreateForm
