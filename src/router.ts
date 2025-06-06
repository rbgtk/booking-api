import express from 'express'

import { logRequest } from './middleware/logMiddleware'

import authRoutes from './routes/authRoutes'
import customerRoutes from './routes/customerRoutes'
import locationRoutes from './routes/locationRoutes'
import oneTimeEventRoutes from './routes/oneTimeEventRoutes'
import recurringEventRoutes from './routes/recurringEventRoutes'
import eventScheduleExceptionRoutes from './routes/eventScheduleExceptionRoutes'

const router = express.Router()

router.use('/', logRequest)
router.use('/auth', authRoutes)
router.use('/customers', customerRoutes)
router.use('/locations', locationRoutes)
router.use('/events/onetime', oneTimeEventRoutes)
router.use('/events/recurring', recurringEventRoutes)
router.use('/events/exceptions', scheduleExceptionRoutes)

export default router
