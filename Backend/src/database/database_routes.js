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

router.post('/new-record', async (req, res) => {
  const details = req.body
  try {
    const animal =
      details.animal === 'cow'
        ? await Cows.create({ ...details })
        : await Buffalos.create({ ...details })
    res.status(201).json(animal)
  } catch (e) {
    if (e.code === 11000) {
      res.status(409).json({ message: 'Tag already present' })
    } else {
      throw e
    }
  }
})

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

router.post('/add-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    console.log(details)
    animal.pregnancy.push({ ...details })
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/update-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    Object.assign(animal.pregnancy[animal.pregnancy.length - 1], details)
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/add-disease/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.disease.push({ ...details })
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/add-vaccine/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  const len = animal.disease.length - 1
  try {
    animal.disease[len].vaccination.push({ ...details })
    animal.disease[len].cured = details.cured
    animal.save()
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router.post('/add-milk/:animal/:tag', getAnimal, async (req, res) => {
  const animal = req.animal
  const details = req.body
  console.log(details)
  try {
    animal.milk.push({ ...details })
    animal.save()
    res.status(201).json(animal)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router.post('/update-disease/:animal/:tag', getAnimal, async (req, res) => {
  const animal = req.animal
  const details = req.body

  try {
    const len = animal.disease.length
    if (!len) {
      animal.disease.push({ ...details })
    } else {
      Object.assign(animal.disease[len - 1], { ...details })
    }
    animal.save()
  } catch (e) {
    res.status(500).json(e)
  }
})

router.delete('/delete/:animal/:tag', getAnimal, async (req, res) => {
  const { animal, tag } = req.params
  animal == 'cow'
    ? await Cows.deleteOne({ tag: tag })
    : await Buffalos.deleteOne({ tag: tag })
  res.json(201)
})

router.get('/all', async (req, res) => {
  res.json(await Cows.find())
})
