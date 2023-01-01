import Cows from './cows.js'
import express from 'express'
import { verifyToken } from '../auth/jwt_auth.js'
import Buffalos from './buffalo.js'

export const router = express.Router()
router.use(verifyToken)

const removeProperties = (obj) => {
  if (obj) ['_id', '__v'].forEach((prop) => delete obj[prop])
  return obj
}

// Add new
router.post('/new-record', async (req, res) => {
  const details = req.body
  try {
    const animal =
      details.animal === 'cow'
        ? await Cows.create({ ...details })
        : await Buffalos.create({ ...details })
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    if (e.code === 11000) {
      res.status(409).json({ message: 'Tag already present' })
    } else {
      throw e
    }
  }
})

// Get old
const getAnimal = async (req, res, next) => {
  const tag = req.params.tag
  let animal
  if (req.params.animal === 'cow') {
    animal = await Cows.findOne({ tag: tag })
  } else if (req.params.animal === 'buffalo') {
    animal = await Buffalos.findOne({ tag: tag })
  }
  if (animal) {
    req.animal = animal
    next()
  } else {
    res.status(404).send('Tag number not found')
  }
}

router.get('/:animal/:tag', getAnimal, (req, res) => {
  const animal = req.animal._doc
  res.status(200).json(removeProperties(animal))
})
router.post('/update/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    Object.assign(animal._doc, details)
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
  }
})

// Pregnancy
router.post('/add-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.pregnancies.unshift({ ...details })
    if (details.delivery?.number) animal.deliveries = details.delivery.number
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router.post(
  '/update-pregnancy/:animal/:tag/:index',
  getAnimal,
  async (req, res) => {
    const details = req.body
    const animal = req.animal
    const index = req.params.index
    try {
      Object.assign(animal.pregnancies[index], details)
      if (details.isPregnant) animal.pregnancies[index].complete = false
      if (details.delivery?.number) animal.deliveries = details.delivery.number
      await animal.save()
      res.status(201).json(animal)
    } catch (e) {
      res.status(500).json(e)
    }
  }
)

router.delete('/abortion/:animal/:tag', getAnimal, async (req, res) => {
  const animal = req.animal
  if (!animal.pregnancies.length) {
    res.sendStatus(409)
    return
  }
  try {
    animal.pregnancies[0].completed = true
    animal.save()
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/delete-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const phases = ['copulation', 'examination', 'lactation', 'delivery']
  const detail = phases[req.body.phase]
  const animal = req.animal
  if (!animal.pregnancies.length) {
    res.sendStatus(409)
    return
  }
  try {
    const lastPregnancy = animal.pregnancies.shift()._doc
    delete lastPregnancy[detail]
    if (detail === 'delivery') lastPregnancy.completed = false

    if (
      phases.reduce(
        (prev, phase) => prev + Object.keys(lastPregnancy[phase] || {}).length,
        0
      )
    )
      animal.pregnancies.unshift(lastPregnancy)
    await animal.save()
    res.sendStatus(204)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

// Disease
router.post('/add-disease/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.diseases.unshift({ ...details })
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
    console.log(e)
  }
})

router.post('/add-vaccine/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.diseases[0].vaccination.push({ ...details })
    animal.diseases[0].cured = details.cured
    animal.save()
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router.post(
  '/update-disease/:animal/:tag/:diseaseIndex/:vaccineIndex',
  getAnimal,
  async (req, res) => {
    const diseaseIndex = req.params.diseaseIndex
    const vaccineIndex = req.params.vaccineIndex
    const animal = req.animal
    const details = req.body
    const currState =
      animal.diseases[diseaseIndex]?.vaccination[vaccineIndex].cured
    if (!animal.diseases[diseaseIndex]?.vaccination[vaccineIndex]) {
      res.sendStatus(409)
      return
    }
    try {
      Object.assign(animal.diseases[diseaseIndex].vaccination[vaccineIndex], {
        ...details,
      })
      if (details.cured) animal.diseases[diseaseIndex].cured = true
      else if (currState) animal.diseases[diseaseIndex].cured = false
      animal.save()
      res.status(201).json(animal)
    } catch (e) {
      res.status(500).json(e)
    }
  }
)

router.delete(
  '/delete-disease/:animal/:tag/:diseaseIndex/:vaccineIndex',
  getAnimal,
  async (req, res) => {
    const animal = req.animal
    const diseaseIndex = req.params.diseaseIndex
    const vaccineIndex = req.params.vaccineIndex
    try {
      if (
        animal.diseases[diseaseIndex]?.cured &&
        animal.diseases[diseaseIndex]?.vaccination[vaccineIndex]?.cured
      ) {
        console.log('here')
        animal.diseases[diseaseIndex].cured = false
      }
      animal.diseases[diseaseIndex]?.vaccination.splice(vaccineIndex, 1)
      if (!animal.diseases[diseaseIndex]?.vaccination.length)
        animal.diseases.splice(diseaseIndex, 1)
      await animal.save()
      res.sendStatus(201)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }
)

// Add Milk
router.post('/add-milk/:animal/:tag', getAnimal, async (req, res) => {
  const animal = req.animal
  const details = req.body
  console.log(details)
  try {
    animal.milk.unshift({ ...details })
    animal.save()
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router.delete('/delete-tag/:animal/:tag', getAnimal, async (req, res) => {
  const { animal, tag } = req.params
  animal == 'cow'
    ? await Cows.deleteOne({ tag: tag })
    : await Buffalos.deleteOne({ tag: tag })
  res.json(201)
})

router.get('/all', async (req, res) => {
  res.json(await Cows.find())
})
