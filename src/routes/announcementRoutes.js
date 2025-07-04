import express from 'express'
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js'
import { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public routes
router.get('/', getAnnouncements)

// protected routes
router.post('/', isAdmin, createAnnouncement)
router.put('/:id', isAdmin, updateAnnouncement)
router.delete('/:id', isAdmin, deleteAnnouncement)

export default router
