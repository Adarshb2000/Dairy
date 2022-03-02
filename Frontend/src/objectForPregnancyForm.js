const objectForPregnancyForm = (data, phase, completed = false) => {
  if (!Object.keys(data).length) throw new Error('Enter some details')
  const temp = {
    0: {
      copulation: {
        date: data.uthiDate,
        bullNumber: data.bullNumber,
        worker: data.worker,
      },
    },
    1: {
      examination: {
        date: data.testDate,
        doctor: data.doctor,
        duration: data.duration,
        isPregnant: data.isPregnant,
      },
    },
    2: {
      lactation: {
        date: data.lactationDate,
      },
    },
    3: {
      delivery: {
        date: data.deliveryDate,
        number: data.number,
        gender: data.gender,
      },
    },
  }
  const object = Object.assign({}, temp[phase])
  object.completed =
    (phase === 1 && data.isPregnant === 'false') || phase === 3 || completed
  console.log(object)
  return object
}

export default objectForPregnancyForm
