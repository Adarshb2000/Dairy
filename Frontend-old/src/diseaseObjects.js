import { objectForSubmission } from './Helper'

const objectForDiseaseForm = (form) => {
  const data = objectForSubmission(form)
  if (Object.keys(data).length == 1) throw new Error('Enter some details')
  const body = {
    vaccination: [
      {
        vaccine: data.vaccine,
        date: data.date,
        doctor: data.doctor,
        cured: data.cured,
      },
    ],
    cured: data.cured,
  }
  return body
}

const objectForVaccineForm = (form) => {
  const data = objectForSubmission(form)
  if (Object.keys(data).length == 1 && !data.cured)
    throw new Error('Enter some details')
  return data
}
export { objectForDiseaseForm, objectForVaccineForm }
