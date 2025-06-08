import express from 'express'
import {
  createRecurringEvent,
  getAllRecurringEvents,
  getRecurringEventById,
  updateRecurringEvent,
  deleteRecurringEvent,
} from '../controllers/recurringEventController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllRecurringEvents)
router.get('/:id', getRecurringEventById)

// protected routes
router.post('/', verifyCookie, createRecurringEvent)
router.put('/:id', verifyCookie, updateRecurringEvent)
router.delete('/:id', verifyCookie, deleteRecurringEvent)

export default router
