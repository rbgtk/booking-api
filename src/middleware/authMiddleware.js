import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

export async function isUser(request, response, next) {
  try {
    const user = jwt.verify(request.cookies.token, secret)

    if (!user.role) {
      throw new Error()
    }

    request.user = user
    next()
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized' })
  }
}

export async function isAdmin(request, response, next) {
  try {
    const user = jwt.verify(request.cookies.token, secret)

    if (user.role !== 'ADMIN') {
      throw new Error()
    }

    request.user = user
    next()
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized' })
  }
}
