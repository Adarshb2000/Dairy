const objectForPregnancyForm = (data, phase, completed = false) => {
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
  return object
}

export default objectForPregnancyForm
