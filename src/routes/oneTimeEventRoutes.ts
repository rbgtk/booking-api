import express from 'express'
import {
  createOneTimeEvent,
  getAllOneTimeEvents,
  getOneTimeEventById,
  updateOneTimeEvent,
  deleteOneTimeEvent,
} from '../controllers/oneTimeEventController'

const router = express.Router()

router.post('/', createOneTimeEvent)
router.get('/', getAllOneTimeEvents)
router.get('/:id', getOneTimeEventById)
router.put('/:id', updateOneTimeEvent)
router.delete('/:id', deleteOneTimeEvent)

export default router
