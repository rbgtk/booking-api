import express from 'express'
import {
  createUnavailability,
  getAllUnavailabilities,
  getUnavailabilityById,
  updateUnavailability,
  deleteUnavailability,
} from '../controllers/unavailabilityController'
import { verifyCookie } from '../middleware/authMiddleware'

const router = express.Router()

// public routes
router.get('/', getAllUnavailabilities)
router.get('/:id', getUnavailabilityById)

// protected routes
router.post('/', createUnavailability)
router.put('/:id', updateUnavailability)
router.delete('/:id', deleteUnavailability)

export default router
