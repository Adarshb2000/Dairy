import jwt from 'jsonwebtoken'
import { key } from '../config.js'

export const createToken = (data) => {
  return jwt.sign(data, key, {
    expiresIn: '1h',
  })
}

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token']
  if (!token) res.sendStatus(400)
  else {
    try {
      req.data = jwt.verify(token, key)
      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) res.sendStatus(408)
      else if (error instanceof jwt.JsonWebTokenError) res.sendStatus(403)
      else res.sendStatus(400)
    }
  }
}
