import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

if (!secret) {
  throw new Error('Missing JWT_SECRET in environment!')
}

const prisma = new PrismaClient()

export const check = async (req, res) => {
  return res.json({ message: 'You are logged in' })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // Look for the admin in the database
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Create JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, secret, {
      expiresIn: '1d', // 1 day expiry
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    return res.json({ message: 'Logged in successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  return res.json({ message: 'Logged out successfully' })
}
