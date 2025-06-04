import express from 'express'
import {
  createRecurringEvent,
  getAllRecurringEvents,
  getRecurringEventById,
  updateRecurringEvent,
  deleteRecurringEvent,
} from '../controllers/recurringEventController'

const router = express.Router()

router.post('/', createRecurringEvent)
router.get('/', getAllRecurringEvents)
router.get('/:id', getRecurringEventById)
router.put('/:id', updateRecurringEvent)
router.delete('/:id', deleteRecurringEvent)

export default router
