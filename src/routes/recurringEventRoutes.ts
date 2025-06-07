import express from 'express'
import {
  createRecurringEvent,
  getAllRecurringEvents,
  getRecurringEventById,
  updateRecurringEvent,
  deleteRecurringEvent,
} from '../controllers/recurringEventController'
import { verifyCookie } from '../middleware/authMiddleware'

const router = express.Router()

// public routes
router.get('/', getAllRecurringEvents)
router.get('/:id', getRecurringEventById)

// protected routes
router.post('/', createRecurringEvent)
router.put('/:id', updateRecurringEvent)
router.delete('/:id', deleteRecurringEvent)

export default router
