import express from 'express'
import { validationResult } from 'express-validator'

const validator: express.Handler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  next()
}

export default validator
