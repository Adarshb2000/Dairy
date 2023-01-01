import { Handler } from 'express'
import { createToken } from '../helpers/jwt'

export const login: Handler = (req, res) => {
  if (
    req.body.username.trim().toLowerCase() !== process.env.websiteusername ||
    req.body.password !== process.env.websitepassword
  ) {
    res.status(401).json({ message: 'Invalid username or password' })
    return
  }
  const token = createToken({ blehh: 'blehh' })
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({ message: 'ok' })
}
