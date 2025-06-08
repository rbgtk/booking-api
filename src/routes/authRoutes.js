import express from 'express'
import { login, logout, getRole } from '../controllers/authController.js'
import { isUser } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.post('/login', login)

// protected routes
router.get('/role', isUser, getRole)
router.post('/logout', isUser, logout)

export default router
