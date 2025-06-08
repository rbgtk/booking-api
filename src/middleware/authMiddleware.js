import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

if (!secret) {
  throw new Error('Missing JWT_SECRET in environment!')
}

export function verifyCookie(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    req.admin = jwt.verify(token, secret)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
