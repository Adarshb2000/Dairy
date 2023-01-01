import { Handler } from 'express'
import jwt from 'jsonwebtoken'

export const createToken = (data: Object) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '2h',
  })
  return token
}

export const verifyToken: Handler = (req, res, next) => {
  try {
    const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    req['data'] = data
    next()
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' })
    } else if (e instanceof jwt.TokenExpiredError) {
      res.sendStatus(408)
    } else {
      res.sendStatus(500)
    }
  }
}
