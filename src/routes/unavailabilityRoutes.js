import express from 'express'
import {
  createUnavailability,
  getAllUnavailabilities,
  getUnavailabilityById,
  updateUnavailability,
  deleteUnavailability,
} from '../controllers/unavailabilityController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllUnavailabilities)
router.get('/:id', getUnavailabilityById)

// protected routes
router.post('/', verifyCookie, createUnavailability)
router.put('/:id', verifyCookie, updateUnavailability)
router.delete('/:id', verifyCookie, deleteUnavailability)

export default router
