import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllEvents(request, response) {
  try {
    const events = await prisma.event.findMany({
      include: { schedules: true, location: true },
      orderBy: { id: 'asc' },
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
  const { name, description, price, locationId, schedules } = request.body
  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        price,
        location: { connect: { id: Number(locationId) } },
        schedules: {
          create: schedules.map((schedule) => ({
            type: schedule.type,
            date: schedule.type === 'ONE_TIME' ? new Date(schedule.date) : null,
            weekday: schedule.type === 'RECURRING' ? schedule.day.toUpperCase() : null,
            time: schedule.type === 'RECURRING' ? schedule.time : null,
          })),
        },
      },
      include: { schedules: true, location: true },
    })
    response.json(event)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Error creating event' })
  }
}

export async function updateEvent(request, response) {
  const { id } = request.params
  const { name, description, price, locationId, schedules } = request.body
  try {
    const event = await prisma.event.update({
      data: {
        name,
        description,
        price,
        location: { connect: { id: Number(locationId) } },
        schedules: {
          deleteMany: {}, // delete all existing schedules for this event
        },
      },
      where: { id: Number(id) },
    })

    await prisma.schedule.createMany({
      data: schedules.map((schedule) => ({
        type: schedule.type,
        date: schedule.type === 'ONE_TIME' ? new Date(schedule.date) : null,
        weekday: schedule.type === 'RECURRING' ? schedule.day.toUpperCase() : null,
        time: schedule.type === 'RECURRING' ? schedule.time : null,
        eventId: event.id,
      })),
    })

    const updatedEvent = await prisma.event.findUnique({
      where: { id: event.id },
      include: { schedules: true, location: true },
    })

    response.json(updatedEvent)
  } catch (error) {
    console.error(error)
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
