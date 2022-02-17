import { Cows } from './cows.js'
import express from 'express'
import { verifyToken } from './auth/jwt_auth.js'

export const router = express.Router()
router.use(verifyToken)

const getTag = async (req, res, next) => {
  const tag = req.body.tag
  const cow = await Cows.findOne({ tag: tag })
  if (cow) {
    req.cow = cow
    next()
  } else {
    res.status(500).json({ message: 'Add tag number first' })
  }
}

router.get('/:animal/:tag', async (req, res) => {
  const tag = Number(req.params.tag)
  const cow = await Cows.findOne({ tag: tag })
  if (cow) {
    res.status(200).json(cow)
  } else {
    res.status(404).json({ message: 'invalid tag number' })
  }
})

router.post('/new-record', async (req, res) => {
  const details = req.body
  try {
    const cow = await Cows.create({ ...details })
    res.status(201).json(cow)
  } catch (e) {
    console.log(e)
    res.status(409).json({ message: 'Tag number already present' })
  }
})

router.post('/update', getTag, async (req, res) => {
  const details = req.body
  const cow = req.cow
  try {
    Object.assign(cow, details)
    await cow.save()
    res.status(201).json(cow)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/add-pregnancy', getTag, async (req, res) => {
  const details = req.body
  if (!details) {
    res.sendStatus(400)
    return
  }
  const cow = req.cow
  cow.pregnancy.push({ ...details })
})

router.post('/add-complete-pregnancy', getTag, async (req, res) => {
  const details = req.body
  if (!details) {
    res.status(400).json({ message: 'Bad request' })
    return
  }
  details[completed] = true
  const cow = req.cow
  cow.pregnancy.push({ ...details })
  await cow.save()
  res.status(201).json(cow)
})

router.post('/update-pregnancy', getTag, async (req, res) => {
  const details = req.body
  const cow = req.cow
  if (!cow.pregnancy.length) {
    cow.pregnancy.push({ ...details })
    await cow.save()
  } else {
    Object.assign(cow.pregnancy[cow.pregnancy.length - 1], details)
  }
  res.sendStatus(201)
})

router.post('/add-disease', getTag, async (req, res) => {
  const details = req.body
  const cow = req.cow
  cow.disease.push({ ...details })
  await cow.save()
  res.status(201).json(cow)
})

router.post('/update-disease', getTag, async (req, res) => {})

router.post('/add-milk-history', getTag, async (req, res) => {
  const cow = req.cow
  const details = req.body
  details.forEach((val) => {
    cow.milkHistory.push({ ...val })
  })
  await cow.save()
  res.status(201).json(cow)
})

router.post('/add-milk', async (req, res) => {
  const details = req.body
  const cow = null
  await details.forEach(async (val) => {
    cow = await Cows.findOne({ tag: val.tag })
    cow.milkHistory.push({ ...val })
    await cow.save()
  })
  res.sendStatus(201)
})

router.get('/all', async (req, res) => {
  res.json(await Cows.find())
})

router.delete('/all', async (req, res) => {
  await Cows.deleteMany()
  res.sendStatus(200)
})
