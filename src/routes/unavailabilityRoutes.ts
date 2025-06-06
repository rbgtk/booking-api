import express from 'express'
import {
  createUnavailability,
  getAllUnavailabilities,
  getUnavailabilityById,
  updateUnavailability,
  deleteUnavailability,
} from '../controllers/unavailabilityController'

const router = express.Router()

router.post('/', createUnavailability)
router.get('/', getAllUnavailabilities)
router.get('/:id', getUnavailabilityById)
router.put('/:id', updateUnavailability)
router.delete('/:id', deleteUnavailability)

export default router
