import express from 'express'
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController'
import { verifyCookie } from '../middleware/authMiddleware'

const router = express.Router()

// public routes
router.get('/', getAllAnnouncements)
router.get('/:id', getAnnouncementById)

// protected routes
router.post('/', verifyCookie, createAnnouncement)
router.put('/:id', verifyCookie, updateAnnouncement)
router.delete('/:id', verifyCookie, deleteAnnouncement)

export default router
