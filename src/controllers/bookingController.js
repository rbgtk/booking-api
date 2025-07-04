import { PrismaClient } from '@prisma/client'
import { sendAdminReservationCreatedEmail } from '../emails/adminReservationCreated.js'

const prisma = new PrismaClient()

export async function createBooking(req, res) {
  try {
    const { date, eventId, scheduleId, name, email, phone, guests, notes } = req.body

    // First, upsert the customer (based on email)
    const customer = await prisma.customer.upsert({
      where: { email },
      update: {
        name,
        phone,
      },
      create: {
        name,
        email,
        phone,
      },
    })

    // Then, create the reservation linked to the customer
    const reservation = await prisma.reservation.create({
      data: {
        customer: {
          connect: { id: customer.id },
        },
        event: {
          connect: { id: eventId },
        },
        schedule: {
          connect: { id: scheduleId },
        },
        date: new Date(date),
        status: 'PENDING',
        guests,
        notes,
      },
    })

    await sendAdminReservationCreatedEmail(date, name, email, phone, notes, guests)

    return res.status(201).json(reservation)
  } catch (error) {
    console.error('Error creating reservation:', error)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
}
