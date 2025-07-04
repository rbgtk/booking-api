import express from 'express'
import { createBooking, getBookings, updateBooking, deleteBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/', getBookings)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

export default router
