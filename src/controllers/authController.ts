import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

if (!secret) {
  throw new Error('Missing JWT_SECRET in environment!')
}

const prisma = new PrismaClient()

export async function login(req: Request, res: Response) {
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

    return res.json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
