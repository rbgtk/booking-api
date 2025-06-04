import express from 'express'

import authRoutes from './routes/authRoutes'
import guestRoutes from './routes/guestRoutes'
import locationRoutes from './routes/locationRoutes'
import oneTimeEventRoutes from './routes/oneTimeEventRoutes'
import recurringEventRoutes from './routes/recurringEventRoutes'
import scheduleExceptionRoutes from './routes/scheduleExceptionRoutes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/guests', guestRoutes)
router.use('/locations', locationRoutes)
router.use('/events/onetime', oneTimeEventRoutes)
router.use('/events/recurring', recurringEventRoutes)
router.use('/schedule/exceptions', scheduleExceptionRoutes)

export default router
