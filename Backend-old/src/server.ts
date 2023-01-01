import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createToken, verifyToken } from './auth/jwt_auth.js'
import { password, username } from './config.js'
import { connect } from './database/database_connection.js'
import { router } from './database/database_routes.js'
import { body, validationResult } from 'express-validator'

export const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.get('/', verifyToken, (req, res) => {
  res.json({ message: 'ok' })
})

app.post(
  '/auth',
  body(['username', 'password']).exists().isString(),

  (req, res) => {
    if (req.body.username !== username || req.body.password !== password)
      res.sendStatus(403)
    else res.json({ token: createToken({ username: req.body.username }) })
  }
)

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke')
})

export const start = async (host, port) => {
  await connect().catch(console.log)
  app.listen(port, host, () => {
    console.log(`running on http://${host}:${port}`)
  })
}
