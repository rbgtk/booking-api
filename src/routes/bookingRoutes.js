import express from 'express'
import { createBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', createBooking)
// router.get('/', getAllReservations)
// router.get('/:id', getReservationById)
// router.put('/:id', updateReservation)
// router.delete('/:id', deleteReservation)

export default router
