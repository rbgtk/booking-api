import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createRecurringEvent(req: Request, res: Response) {
  const { name, description, weekday, time, locationId, price } = req.body

  try {
    const recurringEvent = await prisma.recurringEvent.create({
      data: { name, description, weekday, time, locationId, price },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error creating recurringEvent' })
  }
}

export async function getAllRecurringEvents(req: Request, res: Response) {
  try {
    const recurringEvents = await prisma.recurringEvent.findMany()
    res.json(recurringEvents)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recurringEvents' })
  }
}

export async function getRecurringEventById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const recurringEvent = await prisma.recurringEvent.findUnique({
      where: { id: Number(id) },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recurringEvent' })
  }
}

export async function updateRecurringEvent(req: Request, res: Response) {
  const { id } = req.params
  const { name, description, weekday, time, locationId, price } = req.body

  try {
    const recurringEvent = await prisma.recurringEvent.update({
      where: { id: Number(id) },
      data: { name, description, weekday, time, locationId, price },
    })
    res.json(recurringEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error updating recurringEvent' })
  }
}

export async function deleteRecurringEvent(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.recurringEvent.delete({ where: { id: Number(id) } })
    res.json({ message: 'RecurringEvent deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recurringEvent' })
  }
}
