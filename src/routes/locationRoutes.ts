import express from 'express'
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  getOneTimeEventsByLocationId,
  getRecurringEventsByLocationId,
} from '../controllers/locationController'

const router = express.Router()

router.post('/', createLocation)
router.get('/', getAllLocations)
router.get('/:id', getLocationById)
router.get('/:id/events/onetime', getOneTimeEventsByLocationId)
router.get('/:id/events/recurring', getRecurringEventsByLocationId)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

export default router
