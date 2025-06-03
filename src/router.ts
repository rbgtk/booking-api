import express from 'express'

import authRoutes from './routes/authRoutes'
import locationRoutes from './routes/locationRoutes'
import scheduleRoutes from './routes/scheduleRoutes'
import exceptionRoutes from './routes/exceptionRoutes'
import reservationRoutes from './routes/reservationRoutes'
import privateEventRoutes from './routes/privateEventRoutes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/locations', locationRoutes)
router.use('/schedules', scheduleRoutes)
router.use('/exceptions', exceptionRoutes)
router.use('/reservations', reservationRoutes)
router.use('/private-events', privateEventRoutes)

export default router
