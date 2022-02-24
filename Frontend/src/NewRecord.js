import { useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logDetails, logout, objectForSubmission } from './Helper'
import DateElement from './DateElement'
import SelectElement from './SelectElement'
import { DataBaseError, TokenError } from './CustomErrors'

const NewRecord = () => {
  const params = useParams()
  const [tag, setTag] = useState(params.tag || '')
  const animal = params.animal || ''
  const navigate = useNavigate()
  const [seller, setSeller] = useState('')
  const [loading, setLoading] = useState(false)
  const [vehicleNumber, setVehicleNumber] = useState()
  const comments = useRef([])
  const [currComment, setCurrComment] = useState('')
  const [fr, setFr] = useState(false)

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="wrapper medium">
      <form
        className="new-record-container"
        onSubmit={async (event) => {
          event.preventDefault()
          setLoading(true)
          const object = objectForSubmission(event.target, {
            comments: comments.current,
          })
          try {
            await logDetails('/new-record', object)
            navigate(`/${object.animal}/${object.tag}`, { replace: true })
          } catch (e) {
            alert(e.message)
            if (e instanceof DataBaseError)
              navigate(`/${object.animal}/${object.tag}`, { replace: true })
            else if (e instanceof TokenError) {
              logout(navigate)
              navigate('/login', { replace: true })
            }
            return
          }
        }}
      >
        <h4 className="heading1"> ADD RECORD </h4>
        <SelectElement
          name="animal"
          label="Animal:"
          required={true}
          options={[
            ['Cow', 'cow'],
            ['Buffalo', 'buffalo'],
          ]}
          className="inputs"
          defaultValue={animal}
        />
        <label htmlFor="tag">
          Tag No.:
          <input
            className="inputs w-20"
            required={true}
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            id="tag"
            name="tag"
            type="number"
            min={0}
          />
        </label>
        <label htmlFor="seller">
          Seller:
          <input
            className="inputs w-3/5 max-w-[192px]"
            onChange={(e) => setSeller(e.target.value)}
            id="seller"
            name="seller"
            value={seller}
          />
        </label>
        <DateElement label="Purchase Date:" name="purchaseDate" />
        <label htmlFor="vehicleNumber">
          Vehicle No.:
          <input
            className="inputs w-20"
            onChange={(e) => setVehicleNumber(e.target.value)}
            id="vehicleNumber"
            name="vehicleNumber"
            type="number"
            value={vehicleNumber}
          />
        </label>

        <label htmlFor="comments">
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
              className="text-red1 text-sm font-semibold border-2 border-red1 px-2 ml-2 rounded-md"
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
        </label>
        <button className="buttons w-auto" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewRecord
