import express from 'express'

import authRoutes from './routes/authRoutes'
import serviceRoutes from './routes/serviceRoutes'
import scheduleRoutes from './routes/scheduleRoutes'
import overrideRoutes from './routes/overrideRoutes'
import reservationRoutes from './routes/reservationRoutes'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/services", serviceRoutes)
router.use("/schedules", scheduleRoutes)
router.use("/overrides", overrideRoutes)
router.use("/reservations", reservationRoutes)

export default router
