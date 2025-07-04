import express from 'express'
import { createReservation } from '../controllers/reservationController.js'

const router = express.Router()

router.post('/', createReservation)
// router.get('/', getAllReservations)
// router.get('/:id', getReservationById)
// router.put('/:id', updateReservation)
// router.delete('/:id', deleteReservation)

export default router
