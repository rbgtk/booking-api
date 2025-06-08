import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createRecurringEvent(req, res) {
  const { name, description, weekday, time, locationId, price } = req.body

  try {
    const recurringEvent = await prisma.recurringEvent.create({
      data: {
        name,
        description,
        weekday,
        time,
        location: { connect: { id: locationId } },
        price,
      },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error creating recurringEvent' })
  }
}

export async function getAllRecurringEvents(req, res) {
  try {
    const recurringEvents = await prisma.recurringEvent.findMany({
      include: { location: true },
    })
    res.json(recurringEvents)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recurringEvents' })
  }
}

export async function getRecurringEventById(req, res) {
  const { id } = req.params

  try {
    const recurringEvent = await prisma.recurringEvent.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recurringEvent' })
  }
}

export async function updateRecurringEvent(req, res) {
  const { id } = req.params
  const { name, description, weekday, time, locationId, price } = req.body

  try {
    const recurringEvent = await prisma.recurringEvent.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        weekday,
        time,
        location: { connect: { id: locationId } },
        price,
      },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error updating recurringEvent' })
  }
}

export async function deleteRecurringEvent(req, res) {
  const { id } = req.params

  try {
    await prisma.recurringEvent.delete({ where: { id: Number(id) } })
    res.json({ message: 'RecurringEvent deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recurringEvent' })
  }
}
