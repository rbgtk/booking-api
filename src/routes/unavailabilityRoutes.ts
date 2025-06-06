import express from 'express'
import {
  createUnavailability,
  getAllUnavailabilitys,
  getUnavailabilityById,
  updateUnavailability,
  deleteUnavailability,
} from '../controllers/unavailabilityController'

const router = express.Router()

router.post('/', createUnavailability)
router.get('/', getAllUnavailabilitys)
router.get('/:id', getUnavailabilityById)
router.put('/:id', updateUnavailability)
router.delete('/:id', deleteUnavailability)

export default router
