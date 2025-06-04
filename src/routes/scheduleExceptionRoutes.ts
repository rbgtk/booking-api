import express from 'express'
import {
  createScheduleException,
  getAllScheduleExceptions,
  getScheduleExceptionById,
  updateScheduleException,
  deleteScheduleException,
} from '../controllers/scheduleExceptionController'

const router = express.Router()

router.post('/', createScheduleException)
router.get('/', getAllScheduleExceptions)
router.get('/:id', getScheduleExceptionById)
router.put('/:id', updateScheduleException)
router.delete('/:id', deleteScheduleException)

export default router
