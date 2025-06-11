import express from 'express'
import { getAvailableDates } from '../controllers/availabilityController.js'

const router = express.Router()

router.get('/available-dates', getAvailableDates)

export default router
