import express from 'express'
import {
  createUnavailability,
  getAllUnavailabilities,
  getUnavailabilityById,
  updateUnavailability,
  deleteUnavailability,
} from '../controllers/unavailabilityController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllUnavailabilities)
router.get('/:id', getUnavailabilityById)

// protected routes
router.post('/', isAdmin, createUnavailability)
router.put('/:id', isAdmin, updateUnavailability)
router.delete('/:id', isAdmin, deleteUnavailability)

export default router
