import { useState, useRef, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { animalTranslate } from '../Helpers/helperFunctions'
import DateElement from '../Custom/DateElement'
import SelectElement from '../Custom/SelectElement'
import LanguageContext from '../LanguageContext'
import { animals } from '../Helpers/constants'
import { useMutation } from '@tanstack/react-query'
import { setTagDetails } from './tagDetails'
import { TokenError } from '../customErrors'

const NewRecord = () => {
  // Basics
  const { tag } = useParams()
  const navigate = useNavigate()

  const create = useMutation(setTagDetails, {
    onSuccess: (data) => {
      navigate('/' + data.data.tag)
    },
    onError: (err) => {
      if (err instanceof TokenError) {
        navigate('/login')
      }
    },
  })

  // Comments
  const comments = useRef([])
  const [currComment, setCurrComment] = useState('')
  const [fr, setFr] = useState(false)

  // Language
  const [lang] = useContext(LanguageContext)

  const formSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    const submitData = {}
    submitData.tag = `${data.animal[0].toUpperCase()}-${data.tag}`
    submitData.purchaseDate = new Date(data.purchaseDate)
    submitData.information = data.information
    create.mutate(submitData)
  }

  return (
    <div className="wrapper medium">
      <form className="new-record-container" onSubmit={formSubmit}>
        <h4 className="heading1"> {lang ? 'New Record' : 'रिकॉर्ड जोड़ें'} </h4>
        <SelectElement
          name="animal"
          label={lang ? 'Animal:' : 'जानवर:'}
          required={true}
          options={animals.map((animal) => [
            animalTranslate(animal, 0, lang),
            animal,
          ])}
          className="inputs"
          defaultValue={tag ? (tag[0] === 'C' ? 'cow' : 'buffalo') : ''}
        />
        <label htmlFor="tag">
          {lang ? 'Tag Number' : 'टैग संख्या'}:
          <input
            className="inputs w-20"
            required={true}
            id="tag"
            name="tag"
            type="number"
            min={0}
            defaultValue={tag?.split('-')[1] ?? ''}
          />
        </label>

        <label htmlFor="information">
          {lang ? 'Information' : 'खरीद के बारे में जानकारी'}:
          <input
            className="inputs w-3/5 max-w-[192px]"
            id="information"
            name="information"
          />
        </label>

        <DateElement
          label={lang ? 'Purchase Date' : 'खरीद की तारीख'}
          name="purchaseDate"
          lang={lang}
          defaultValue={new Date()}
        />

        {/* <label htmlFor="comments">
          Comments:{' '}
          <div
            className="max-h-20 overflow-y-scroll"
            hidden={!comments.current.length}
          >
            <ul className="text-red1">
              {fr ? '' : ''}
              {comments.current.map((val, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    comments.current = comments.current.filter((val) => {
                      return val !== e.target.innerText.trim()
                    })
                    setFr(!fr)
                  }}
                >
                  {val}
                  <br />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-row">
            <textarea
              className="inputs"
              onChange={(e) => setCurrComment(e.target.value)}
              id="comments"
              name="comments"
              value={currComment}
            />
            <button
              className="ml-2 rounded-md border-2 border-red1 px-2 text-sm font-semibold text-red1"
              type="button"
              onClick={() => {
                if (currComment) {
                  comments.current.push(currComment)
                  setCurrComment('')
                } else {
                  alert('Enter some comment')
                }
              }}
            >
              Add
            </button>
          </div>
        </label> */}
        <button className="buttons w-3/5" type="submit">
          {lang ? 'Submit' : 'जमा करें|'}
        </button>
      </form>
    </div>
  )
}

export default NewRecord
