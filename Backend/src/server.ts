import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { login } from './handlers/auth'
import { body, param } from 'express-validator'
import validator from './helpers/validator'
import pregnancyRouter from './pregnancy/router'
import diseaseRouter from './disease/router'
import animalRouter from './animal/router'
import milkRouter from './milk/router'
import { verifyToken } from './helpers/jwt'
import cookieParser from 'cookie-parser'
import { origins } from './config'

const app = express()
app.use(
  cors({
    origin: (origin, callback) => {
      if (origins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/abcd', (req, res) => {
  res.cookie('blehh', 'blehh', {
    httpOnly: true,
  })
  res.json({ message: 'Hello World!' })
})

app.post('/login', body(['username', 'password']).exists(), validator, login)

app.use(verifyToken)
app.get('/verified-token', (req, res, next) => {
  res.json({ message: 'Hello World!' })
})
app.use('/animal', animalRouter)

app.use(
  '/pregnancy/:tag',
  param('tag')
    .exists()
    .matches(/[B|C]-\d+/),
  validator,
  pregnancyRouter
)

app.use(
  '/disease/:tag',
  param('tag')
    .exists()
    .matches(/[B|C]-\d+/),
  validator,
  diseaseRouter
)

app.use(
  '/milk/:tag',
  param('tag')
    .exists()
    .matches(/[B|C]-\d+/),
  validator,
  milkRouter
)

app.use((err, req, res, next) => {
  if (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Detail not found' })
    } else if (err.code === 'P2002') {
      res.status(409).json({ message: 'Already Present' })
    } else {
      console.log(err)
      res.status(500).json({
        message: 'Something went wrong',
      })
    }
  } else {
    res.status(404).json({ message: 'Invalid Route' })
  }
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
  })
}
