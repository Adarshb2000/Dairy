import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logDetails, logout, objectForSubmission } from './Helper'
import DateElement from './DateElement'
import { DataBaseError, TokenError } from './CustomErrors'
import SelectElement from './SelectElement'
const NewRecord = () => {
  const navigate = useNavigate()
  const [tag, setTag] = useState(0)
  const [seller, setSeller] = useState('')
  const [loading, setLoading] = useState(false)
  const [vehicleNumber, setVehicleNumber] = useState()
  const comments = useRef([])
  const [currComment, setCurrComment] = useState('')
  const [fr, setFr] = useState(false)

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="wrapper">
      <form
        className="box0 bigbox w-5/6 bg-white"
        onSubmit={(event) => {
          event.preventDefault()
          setLoading(true)
          const object = objectForSubmission(event.target, {
            comments: comments.current,
          })
          logDetails('/new-record', object)
            .then(console.log)
            .catch((e) => {
              console.log(e)
              alert(e.message)
              if (e instanceof TokenError) {
                logout(navigate)
              }
              setLoading(false)
            })
        }}
      >
        <h4 className="heading1"> ADD RECORD </h4>
        <SelectElement
          name="animal"
          label="Animal:"
          options={[
            ['Cow', 'cow'],
            ['Buffalo', 'buffalo'],
          ]}
          className="inputs"
        />
        <label htmlFor="tag">
          Tag No.:
          <input
            className="inputs w-20"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            id="tag"
            name="tag"
            type="number"
          />
        </label>
        <label htmlFor="seller">
          Seller:
          <input
            className="inputs"
            onChange={(e) => setSeller(e.target.value)}
            id="seller"
            name="seller"
            value={seller}
          />
        </label>
        <DateElement
          label="Purchase Date:"
          name="purchaseDate"
          className="inputs max-w-min"
        />
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
              add
            </button>
          </div>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewRecord
