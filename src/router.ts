import express from 'express'

import { logRequest } from './middleware/logMiddleware'
import { errorHandler } from './middleware/errorMiddleware'

import authRoutes from './routes/authRoutes'
import customerRoutes from './routes/customerRoutes'
import locationRoutes from './routes/locationRoutes'
import oneTimeEventRoutes from './routes/oneTimeEventRoutes'
import recurringEventRoutes from './routes/recurringEventRoutes'
import unavailabilityRoutes from './routes/unavailabilityRoutes'

const router = express.Router()

router.use('/', logRequest)
router.use('/auth', authRoutes)
router.use('/customers', customerRoutes)
router.use('/locations', locationRoutes)
router.use('/events/onetime', oneTimeEventRoutes)
router.use('/events/recurring', recurringEventRoutes)
router.use('/unavailabilities', unavailabilityRoutes)
router.use(errorHandler)

export default router
