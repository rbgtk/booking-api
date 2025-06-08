import express from 'express'

import { logRequest } from './middleware/logMiddleware.js'
import { errorHandler } from './middleware/errorMiddleware.js'

import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import unavailabilityRoutes from './routes/unavailabilityRoutes.js'

const router = express.Router()

// log requests
router.use(logRequest)

// route requests
router.use('/auth', authRoutes)
router.use('/events', eventRoutes)
router.use('/locations', locationRoutes)
router.use('/customers', customerRoutes)
router.use('/reservations', reservationRoutes)
router.use('/announcements', announcementRoutes)
router.use('/unavailabilities', unavailabilityRoutes)

// log errors
router.use(errorHandler)

export default router
