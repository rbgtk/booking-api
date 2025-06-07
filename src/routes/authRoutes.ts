import express from 'express'
import { check, login, logout } from '../controllers/authController'
import { verifyCookie } from '../middleware/authMiddleware'

const router = express.Router()

// public routes
router.post('/login', login)

// protected routes
router.get('/me', verifyCookie, check)
router.post('/logout', verifyCookie, logout)

export default router
