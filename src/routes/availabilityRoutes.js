import express from 'express'
import { getAvailableDates, getEventsForDate } from '../controllers/availabilityController.js'

const router = express.Router()

router.get('/available-dates', getAvailableDates)
router.get('/available-events', getEventsForDate)

export default router
