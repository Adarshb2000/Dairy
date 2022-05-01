import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DataBaseError, TokenError } from './CustomErrors'
import { logout, fetchDetails } from './Helper'
import MilkForm from './MilkForm'
import MilkDisplay from './MilkDisplay'
import DeleteButton from './DeleteButton'
import Diseases from './Diseases'
import Pregnancies from './Pregnancies'

const SearchRecordOurStyle = () => {
  // Basic
  const { animal, tag } = useParams()

  // API CALL
  const [loading, setLoading] = useState(true)

  // Details
  const details = useRef(null)
  const [pregnancy, setPregnancy] = useState([])
  const [milkDisplay, setMilkDisplay] = useState(5)
  const [milk, setMilk] = useState([])
  const nextDeliveryNumber = useRef(0)


  // ----------------------------------------------------------------
  // Form EDIT
  const currentPhase = useRef(-1)
  const [pregnancyEditInfo, setPregnancyEditInfo] = useState({})
  const [phase, setPhase] = useState(-1)
  const pregnancyEdit = (information, ph) => {
    setPregnancyFormDisplay(false)
    setPregnancyEditInfo(information)
    setPhase(ph)
    setTimeout(() => displayForm(0, true), 10)
  }

  return loading ? (
    <>Loading</>
  ) : details.current ? (
    <div className="wrapper">
      <div className="search-record-container medium overflow-y-auto">
        <div className="flex relative justify-center py-2">
          <div className="heading0 self-end mt-4">{animal.toUpperCase()}</div>
          <div className="absolute right-6 text-7xl font-bold text-red1">
            {details.current.tag}
          </div>
        </div>
        <div className="flex-column justify-evenly px-3.5 sm:px-8 h-auto">
          {/* Basic Information */}
          <div className="pregnancy-box h-48">
            <h2 className="heading2">PURCHASE</h2>
            <div className="pregnancy-box bg-colour h-24 m-2 overflow-y-auto">
              {details.current.purchaseDate ? (
                <label htmlFor="date">
                  Date:{' '}
                  <span>
                    {new Date(details.current.purchaseDate).toLocaleDateString(
                      'hi-IN',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </label>
              ) : (
                <></>
              )}
              {details.current.seller ? (
                <label htmlFor="seller">
                  Seller: <span>{details.current.seller}</span>
                </label>
              ) : (
                <></>
              )}
              {details.current.vehicleNumber ? (
                <label htmlFor="vehicleNumber">
                  Vehicle Number: <span>{details.current.vehicleNumber}</span>
                </label>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Pregnancy information */}
          <Pregnancies
            displayForm={displayForm}
            pregnancyFormDisplay={pregnancyFormDisplay}
            pregnancies={pregnancy}
          />

          {/* Disease information */}
          <Diseases
            diseaseFormDisplay={diseaseFormDisplay}
            diseases={details.current.disease}
            displayForm={displayForm}
          />

          {/* Milk information */}
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">MILK RECORD</h2>
            <MilkDisplay info={milk.slice(0, milkDisplay)} />
            {milkFormDisplay && (
              <div className="h-auto self-center">
                <MilkForm />
              </div>
            )}
            <div className="flex justify-center">
              <button
                hidden={!details.current.milk.length}
                className="buttons2 w-28 m-2"
                onClick={() => {
                  if (milkDisplay >= milk.length) setMilkDisplay(5)
                  else setMilkDisplay(milkDisplay + 5)
                }}
              >
                {milkDisplay >= milk.length ? 'Show Less' : 'Show more'}
              </button>
              <button
                className="buttons2 w-24 m-2"
                onClick={() => {
                  displayForm(2)
                }}
              >
                Add Milk
              </button>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-evenly items-center bg-rose-200 rounded-lg px-4 py-3 my-2 h-auto">
            <Link to={'/'} className="buttons w-24 min-w-fit m-2">
              &larr; Go back
            </Link>
            <DeleteButton
              subRoute={`/delete-tag/${animal}/${tag}`}
              navigate={() => navigate('/', { replace: true })}
              alertDialog={`Are you sure you want to delete ${animal} ${tag}`}
              text="Delete Tag"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="flex rounded-xl bg-white p-4">
        <div className="pregnancy-box h-auto">
          <h4 className="heading1">Record not found</h4>
          <div className="flex justify-evenly">
            <Link
              to={`/new-record/${animal}/${tag}`}
              className="buttons w-max self-center"
            >
              Add it!
            </Link>
            <Link to={`/`} replace={true} className="buttons w-max self-center">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchRecordOurStyle
