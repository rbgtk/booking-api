import { Router } from 'express'
import {
  getPrivateEvents,
  getPrivateEventById,
  createPrivateEvent,
  updatePrivateEvent,
  deletePrivateEvent,
} from '../controllers/privateEventController'

const router = Router()

router.get('/', getPrivateEvents)
router.get('/:id', getPrivateEventById)
router.post('/', createPrivateEvent)
router.put('/:id', updatePrivateEvent)
router.delete('/:id', deletePrivateEvent)

export default router
