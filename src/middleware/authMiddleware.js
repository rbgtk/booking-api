import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET || 'your-default-secret'

export async function isUser(request, response, next) {
  try {
    const user = jwt.verify(request.cookies.token, secret)

    if (user.role !== 'USER') {
      throw new Error()
    }

    response.user = user
    next()
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized' })
  }
}

export async function isAdmin(request, response, next) {
  try {
    const account = jwt.verify(request.cookies.token, secret)

    if (account.userRole !== 'ADMIN') {
      throw new Error()
    }

    response.admin = account
    next()
  } catch (error) {
    response.status(401).json({ message: 'Unauthorized' })
  }
}
