import { objectForSubmission } from './Helper'

const objectForDiseaseForm = (form) => {
  const data = objectForSubmission(form)
  const body = {
    date: data.date,
    doctor: data.doctor,
    vaccination: [
      {
        vaccine: data.vaccine,
        date: data.date,
        doctor: data.doctor,
      },
    ],
    cured: data.cured,
  }
  return body
}

const objectForVaccineForm = (form) => objectForSubmission(form)
export { objectForDiseaseForm, objectForVaccineForm }
