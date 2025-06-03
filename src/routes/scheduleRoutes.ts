import { Router } from 'express'
import {
  getAllSchedules,
  getSchedulesByLocation,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController'

const router = Router()

router.get('/', getAllSchedules)
router.get('/:locationId', getSchedulesByLocation)
router.post('/', createSchedule)
router.put('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)

export default router
