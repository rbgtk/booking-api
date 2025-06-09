import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
const secret = process.env.JWT_SECRET

export async function getRole(request, response) {
  return response.status(200).json({ message: 'Authenticated', role: request.user.role })
}

export async function login(request, response) {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ error: 'Email and password are request.ired' })
  }

  try {
    // Look for the admin in the database
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return response.status(401).json({ error: 'Invalid email or password' })
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Invalid email or password' })
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
      expiresIn: '1h', // 1 hour expiry
    })

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    })

    return response.json({ id: user.id, email: user.email, role: user.role })
  } catch (error) {
    return response.status(500).json({ error: 'Server error' })
  }
}

export async function logout(request, response) {
  response.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  return response.json({ message: 'Logged out successfully' })
}
