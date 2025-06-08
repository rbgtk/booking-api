import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js'
import { createSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// protected routes
router.post('/', isAdmin, createEvent)
router.put('/:id', isAdmin, updateEvent)
router.delete('/:id', isAdmin, deleteEvent)

router.post('/:id/schedule', isAdmin, createSchedule)
router.put('/:id/schedule/:scheduleId', isAdmin, updateSchedule)
router.delete('/:id/schedule/:scheduleId', isAdmin, deleteSchedule)

export default router
