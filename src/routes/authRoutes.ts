import express from 'express'
import { check, login, logout } from '../controllers/authController'
import { verifyCookie } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/me', verifyCookie, check)
router.post('/login', login)
router.post('/logout', verifyCookie, logout)

export default router
