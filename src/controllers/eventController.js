import { PrismaClient } from '@prisma/client'
import { createSchedule, updateSchedule, deleteSchedule } from './scheduleController'

const prisma = new PrismaClient()

export async function getAllEvents(request, response) {
  try {
    const events = await prisma.event.findMany()
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
    })
    response.json(event)
  } catch (error) {
    response.status(500).json({ message: 'Error fetching event' })
  }
}

export async function createEvent(request, response) {
  const { name, description, locationId, price, scheduleType, scheduleDate, scheduleDay, scheduleTime } = request.body
  try {
    const schedule = await createSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime)
    const event = await prisma.event.create({
      data: { name, description, schedule, location: { connect: { id: Number(locationId) } }, price },
    })
    response.json(event)
  } catch (error) {
    response.status(500).json({ message: 'Error creating event' })
  }
}

export async function updateEvent(request, response) {
  const { id } = request.params
  const { name, description, locationId, price, scheduleType, scheduleDate, scheduleDay, scheduleTime } = request.body
  try {
    const schedule = await updateSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime)
    const event = await prisma.event.update({
      data: { name, description, schedule, location: { connect: { id: Number(locationId) } }, price },
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
    await deleteSchedule(id)
    await prisma.event.delete({
      where: { id: Number(id) },
    })
    response.json({ message: 'Event deleted' })
  } catch (error) {
    response.status(500).json({ message: 'Error deleting event' })
  }
}
