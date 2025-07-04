import express from 'express'
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getServices)

// protected routes
router.post('/', isAdmin, createService)
router.put('/:id', isAdmin, updateService)
router.delete('/:id', isAdmin, deleteService)

export default router
