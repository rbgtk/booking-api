import express from 'express'
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from '../controllers/locationController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllLocations)
router.get('/:id', getLocationById)

// protected routes
router.post('/', verifyCookie, createLocation)
router.put('/:id', verifyCookie, updateLocation)
router.delete('/:id', verifyCookie, deleteLocation)

export default router
