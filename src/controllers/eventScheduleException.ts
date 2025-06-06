import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createEventScheduleException(req: Request, res: Response) {
  const { date, locationId, reason } = req.body

  try {
    const eventScheduleException = await prisma.eventScheduleException.create({
      data: { date, location: { connect: { id: locationId } }, reason },
    })
    res.json(eventScheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error creating eventScheduleException' })
  }
}

export async function getAllEventScheduleExceptions(req: Request, res: Response) {
  try {
    const eventScheduleExceptions = await prisma.eventScheduleException.findMany()
    res.json(eventScheduleExceptions)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching eventScheduleExceptions' })
  }
}

export async function getEventScheduleExceptionById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const eventScheduleException = await prisma.eventScheduleException.findUnique({
      where: { id: Number(id) },
    })
    res.json(eventScheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching eventScheduleException' })
  }
}

export async function updateEventScheduleException(req: Request, res: Response) {
  const { id } = req.params
  const { date, locationId, reason } = req.body

  try {
    const eventScheduleException = await prisma.eventScheduleException.update({
      where: { id: Number(id) },
      data: { date, location: { connect: { id: locationId } }, reason },
    })
    res.json(eventScheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error updating eventScheduleException' })
  }
}

export async function deleteEventScheduleException(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.eventScheduleException.delete({ where: { id: Number(id) } })
    res.json({ message: 'EventScheduleException deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting eventScheduleException' })
  }
}
