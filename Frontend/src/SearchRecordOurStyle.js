import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PregnancyDisplay from './PregnancyDisplay'
import { DataBaseError, TokenError } from './CustomErrors'
import { deleteDetails, logout, fetchDetails } from './Helper'
import DiseaseForm from './DiseaseForm'
import MilkForm from './MilkForm'
import DiseaseDisplay from './DiseaseDisplay'
import MilkDisplay from './MilkDisplay'
import PregnancyForm from './pregnancy-forms/PregnancyForm'
import DeleteButton from './DeleteButton'

const SearchRecordOurStyle = () => {
  const { animal, tag } = useParams()

  const [loading, setLoading] = useState(true)

  // Add form
  const [addDisease, setAddDisease] = useState(true)
  const [isCured, setIsCured] = useState(true)
  const [addMilk, setAddMilk] = useState(true)

  // Details
  const details = useRef(null)
  const [preg, setPreg] = useState([])
  const [disease, setDisease] = useState([])
  const [milkDisplay, setMilkDisplay] = useState(5)
  const [milk, setMilk] = useState([])

  const [pregnancyFormDisplay, setPregnancyFormDisplay] = useState(true)
  const currentPhase = useRef(-1)

  const info = useRef({})
  const [phase, setPhase] = useState(-1)

  const navigate = useNavigate()

  const doubleClick = (information, ph) => {
    setPregnancyFormDisplay(false)
    info.current = information
    setPhase(ph)
    setPregnancyFormDisplay(!pregnancyFormDisplay)
  }

  const fetchDet = async () => {
    try {
      details.current = await fetchDetails(animal, tag)
      const lastPregnancy = details.current.pregnancy.slice(-1)[0]
      currentPhase.current =
        !lastPregnancy || lastPregnancy?.completed
          ? 0
          : !lastPregnancy?.examination
          ? 1
          : !lastPregnancy?.lactation
          ? 2
          : 3

      console.log(lastPregnancy)

      setPhase(currentPhase.current)

      setIsCured(
        !details.current.disease.length ||
          details.current.disease.slice(-1)[0]?.cured
      )
      setPreg(details.current.pregnancy.slice(-1))
      setDisease(details.current.disease.slice(-1))
      setMilk(details.current.milk.reverse())
      setLoading(false)
    } catch (e) {
      if (e instanceof DataBaseError) {
        setLoading(false)
      } else if (e instanceof TokenError) {
        logout(navigate)
      } else console.log(e)
    }
  }

  useEffect(() => {
    fetchDet()
  }, [])

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
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">PREGNANCY</h2>
            <div className="divide-y-4 divide-white">
              {preg.map((ele, index) => (
                <PregnancyDisplay
                  info={ele}
                  key={index}
                  doubleClick={doubleClick}
                />
              ))}
            </div>
            <div className="h-auto self-center" hidden={pregnancyFormDisplay}>
              <PregnancyForm
                phase={phase}
                info={phase !== currentPhase.current ? info.current : {}}
                edit={phase !== currentPhase.current}
              />
            </div>
            <div className="flex-column xs:min-h-[70px]">
              <button
                onClick={() => {
                  if (pregnancyFormDisplay) {
                    setAddMilk(pregnancyFormDisplay)
                    setAddDisease(pregnancyFormDisplay)
                  }
                  setPregnancyFormDisplay(!pregnancyFormDisplay)
                  setPhase(currentPhase.current)
                }}
                className="buttons2 w-fit m-2"
              >
                {!currentPhase.current ? 'Add' : 'Update'} Pregnancy
              </button>
              <button
                onClick={() => {
                  setPreg(
                    preg.length === 1
                      ? details.current.pregnancy
                      : details.current.pregnancy.slice(-1)
                  )
                  scrollTo({ top: 0 })
                }}
                hidden={!(details.current.pregnancy.length > 1)}
                className="buttons2 m-2 w-fit"
              >
                {preg.length > 1 ? 'hide' : 'show all'}
              </button>
              <Link
                to={`/add-complete-pregnancy/${animal}/${tag}`}
                className="buttons w-20 min-w-fit m-2"
              >
                Add complete pregnancy
              </Link>
            </div>
          </div>

          {/* Disease information */}
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">DISEASE</h2>
            <div className="divide-y-4 divide-white">
              {disease.map((ele, index) =>
                ele.vaccination.length ? (
                  <DiseaseDisplay info={ele} key={index} />
                ) : (
                  <></>
                )
              )}
            </div>
            <div className="h-auto self-center" hidden={addDisease}>
              <DiseaseForm disease={isCured} />
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setDisease(
                    disease.length === 1
                      ? details.current.disease
                      : details.current.disease.slice(-1)
                  )
                  scrollTo({ top: 0 })
                }}
                hidden={!(details.current.disease.length > 1)}
                className="buttons w-44 m-2"
              >
                {disease.length > 1 ? 'hide' : 'show all'}
              </button>
              <button
                onClick={() => {
                  if (addDisease) {
                    setAddPregnancy(addDisease)
                    setAddMilk(addDisease)
                  }
                  setAddDisease(!addDisease)
                }}
                className="buttons2 w-auto m-2"
              >
                {isCured ? 'Add' : 'Update'} disease
              </button>
            </div>
          </div>

          {/* Milk information */}
          <div className="pregnancy-box h-auto">
            <h2 className="heading2">MILK RECORD</h2>
            <MilkDisplay info={milk.slice(0, milkDisplay)} />
            <div className="h-auto self-center" hidden={addMilk}>
              <MilkForm />
            </div>
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
                  if (addMilk) {
                    setAddPregnancy(addMilk)
                    setAddDisease(addMilk)
                  }
                  setAddMilk(!addMilk)
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
          <Link
            to={`/new-record/${animal}/${tag}`}
            className="buttons w-auto self-center"
          >
            Add it!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchRecordOurStyle
