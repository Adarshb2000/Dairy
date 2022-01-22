import { DataBaseError, TokenError } from './CustomErrors'
import { logDetails, logout, objectForSubmission } from './Helper'

const diseaseFormSubmission = async (form, subRoute, navigate, animal, tag) => {
  const data = objectForSubmission(form)
  const body = {
    date: data.diseaseDate,
    doctor: data.doctor,
    vaccination: {
      vaccine: data.vaccine,
      date: data.diseaseDate,
      doctor: data.doctor,
    },
    cured: data.cured,
  }

  try {
    const res = await logDetails(subRoute, body)
    console.log(res)
    navigate(`/${animal}/${tag}`, { replace: true })
  } catch (e) {
    if (e instanceof TokenError) {
      alert('not logged in')
      logout(navigate)
    } else if (e instanceof DataBaseError) {
      alert('no such record found')
      navigate(`/new-record/${animal}/${tag}`, { replace: true })
    }
  }
}

const vaccineFormSubmission = async (e) => {
  const data = objectForSubmission(e.target)
  const vaccination = {
    vaccine: data.vaccine,
    date: data.vaccinationDate,
    doctor: data.doctor,
  }

  try {
    const res = await logDetails(subRoute, vaccination)
    console.log(res)
    navigate(`/${animal}/${tag}`, { replace: true })
  } catch (e) {
    if (e instanceof TokenError) {
      alert('not logged in')
      logout(navigate)
    } else if (e instanceof DataBaseError) {
      alert('no such record found')
      navigate(`/new-record/${animal}/${tag}`, { replace: true })
    }
  }
}
export { diseaseFormSubmission, vaccineFormSubmission }
