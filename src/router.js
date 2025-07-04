import express from 'express'

import { errorHandler } from './middleware/errorMiddleware.js'

import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import unavailabilityRoutes from './routes/unavailabilityRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'

const router = express.Router()

// route requests
router.use('/auth', authRoutes)
router.use('/events', eventRoutes)
router.use('/bookings', bookingRoutes)
router.use('/locations', locationRoutes)
router.use('/announcements', announcementRoutes)
router.use('/unavailabilities', unavailabilityRoutes)
router.use('/availabilities', availabilityRoutes)

// log errors
router.use(errorHandler)

export default router
