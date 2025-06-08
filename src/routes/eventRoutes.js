import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js'
import { createSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// protected routes
router.post('/', verifyCookie, createEvent)
router.put('/:id', verifyCookie, updateEvent)
router.delete('/:id', verifyCookie, deleteEvent)

router.post('/:id/schedule', verifyCookie, createSchedule)
router.put('/:id/schedule/:scheduleId', verifyCookie, updateSchedule)
router.delete('/:id/schedule/:scheduleId', verifyCookie, deleteSchedule)

export default router
