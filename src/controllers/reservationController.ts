import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany()
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' })
  }
}

export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(id) },
    })
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }
    res.json(reservation)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservation' })
  }
}

export const createReservation = async (req: Request, res: Response) => {
  const { eventDate, time, locationId, guestName, guestEmail, guestPhone } =
    req.body
  try {
    const newReservation = await prisma.reservation.create({
      data: {
        eventDate: new Date(eventDate),
        time,
        locationId,
        guestName,
        guestEmail,
        guestPhone,
      },
    })
    res.status(201).json(newReservation)
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' })
  }
}

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params
  const { paymentStatus } = req.body
  try {
    const updatedReservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: { paymentStatus },
    })
    res.json(updatedReservation)
  } catch (error) {
    res.status(500).json({ error: 'Error updating reservation' })
  }
}

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.reservation.delete({ where: { id: Number(id) } })
    res.json({ message: 'Reservation deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reservation' })
  }
}
