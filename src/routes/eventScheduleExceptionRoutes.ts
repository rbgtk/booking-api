import express from 'express'
import {
  createEventScheduleException,
  getAllEventScheduleExceptions,
  getEventScheduleExceptionById,
  updateEventScheduleException,
  deleteEventScheduleException,
} from '../controllers/scheduleExceptionController'

const router = express.Router()

router.post('/', createEventScheduleException)
router.get('/', getAllEventScheduleExceptions)
router.get('/:id', getEventScheduleExceptionById)
router.put('/:id', updateEventScheduleException)
router.delete('/:id', deleteEventScheduleException)

export default router
