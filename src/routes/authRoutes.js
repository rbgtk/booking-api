import express from 'express'
import { check, login, logout } from '../controllers/authController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.post('/login', login)

// protected routes
router.get('/me', verifyCookie, check)
router.post('/logout', verifyCookie, logout)

export default router
