import express from 'express'
import { createLocation, getLocations, updateLocation, deleteLocation } from '../controllers/locationController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getLocations)

// protected routes
router.post('/', isAdmin, createLocation)
router.put('/:id', isAdmin, updateLocation)
router.delete('/:id', isAdmin, deleteLocation)

export default router
