import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

if (!secret) {
  throw new Error('Missing JWT_SECRET in environment!')
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secret)
    // Optionally attach to request for use in handlers
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

