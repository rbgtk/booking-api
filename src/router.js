import express from 'express'

import { errorHandler } from './middleware/errorMiddleware.js'

import authRoutes from './routes/authRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import unavailabilityRoutes from './routes/unavailabilityRoutes.js'

const router = express.Router()

// route requests
router.use('/auth', authRoutes)
router.use('/bookings', bookingRoutes)
router.use('/services', serviceRoutes)
router.use('/locations', locationRoutes)
router.use('/announcements', announcementRoutes)
router.use('/unavailabilities', unavailabilityRoutes)

// log errors
router.use(errorHandler)

export default router
