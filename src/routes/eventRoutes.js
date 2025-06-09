import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// protected routes
router.post('/', isAdmin, createEvent)
router.put('/:id', isAdmin, updateEvent)
router.delete('/:id', isAdmin, deleteEvent)

export default router
