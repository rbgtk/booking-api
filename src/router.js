import express from 'express'

import { logRequest } from './middleware/logMiddleware.js'
import { errorHandler } from './middleware/errorMiddleware.js'

import authRoutes from './routes/authRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import oneTimeEventRoutes from './routes/oneTimeEventRoutes.js'
import recurringEventRoutes from './routes/recurringEventRoutes.js'
import unavailabilityRoutes from './routes/unavailabilityRoutes.js'

const router = express.Router()

router.use(logRequest)

router.use('/auth', authRoutes)
router.use('/announcements', announcementRoutes)
router.use('/customers', customerRoutes)
router.use('/locations', locationRoutes)
router.use('/events/onetime', oneTimeEventRoutes)
router.use('/events/recurring', recurringEventRoutes)
router.use('/unavailabilities', unavailabilityRoutes)

router.use(errorHandler)

export default router
