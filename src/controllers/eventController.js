import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllEvents(request, response) {
  try {
    const events = await prisma.event.findMany({
      include: { schedules: true, location: true },
    })
    response.json(events)
  } catch (error) {
    response.status(500).json({ message: 'Error fetching events' })
  }
}

export async function getEventById(request, response) {
  const { id } = request.params
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { schedules: true, location: true },
    })
    response.json(event)
  } catch (error) {
    response.status(500).json({ message: 'Error fetching event' })
  }
}

export async function createEvent(request, response) {
  const { name, description, locationId, price } = request.body
  try {
    const event = await prisma.event.create({
      data: { name, description, location: { connect: { id: Number(locationId) } }, price },
      include: { schedules: true, location: true },
    })
    response.json(event)
  } catch (error) {
    response.status(500).json({ message: 'Error creating event' })
  }
}

export async function updateEvent(request, response) {
  const { id } = request.params
  const { name, description, locationId, price } = request.body
  try {
    const event = await prisma.event.update({
      data: { name, description, location: { connect: { id: Number(locationId) } }, price },
      include: { schedules: true, location: true },
      where: { id: Number(id) },
    })
    response.json(event)
  } catch (error) {
    response.status(500).json({ message: 'Error updating event' })
  }
}

export async function deleteEvent(request, response) {
  const { id } = request.params
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    })
    response.json({ message: 'Event deleted' })
  } catch (error) {
    response.status(500).json({ message: 'Error deleting event' })
  }
}
