import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBooking(req, res) {}

export async function getBookings(req, res) {
  const bookings = await prisma.booking.findMany()
  res.json(bookings)
}

export async function updateBooking(req, res) {}

export async function deleteBooking(req, res) {}
