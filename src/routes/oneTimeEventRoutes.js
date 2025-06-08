import express from 'express'
import {
  createOneTimeEvent,
  getAllOneTimeEvents,
  getOneTimeEventById,
  updateOneTimeEvent,
  deleteOneTimeEvent,
} from '../controllers/oneTimeEventController.js'
import { verifyCookie } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAllOneTimeEvents)
router.get('/:id', getOneTimeEventById)

// protected routes
router.post('/', verifyCookie, createOneTimeEvent)
router.put('/:id', verifyCookie, updateOneTimeEvent)
router.delete('/:id', verifyCookie, deleteOneTimeEvent)

export default router
