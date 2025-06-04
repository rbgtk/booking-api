import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createScheduleException(req: Request, res: Response) {
  const { date, locationId, reason } = req.body

  try {
    const scheduleException = await prisma.scheduleException.create({
      data: { date, locationId, reason },
    })
    res.json(scheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error creating scheduleException' })
  }
}

export async function getAllScheduleExceptions(req: Request, res: Response) {
  try {
    const scheduleExceptions = await prisma.scheduleException.findMany()
    res.json(scheduleExceptions)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scheduleExceptions' })
  }
}

export async function getScheduleExceptionById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const scheduleException = await prisma.scheduleException.findUnique({ where: { id: Number(id) } })
    res.json(scheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scheduleException' })
  }
}

export async function updateScheduleException(req: Request, res: Response) {
  const { id } = req.params
  const { date, locationId, reason } = req.body

  try {
    const scheduleException = await prisma.scheduleException.update({
      where: { id: Number(id) },
      data: { date, locationId, reason },
    })
    res.json(scheduleException)
  } catch (error) {
    res.status(500).json({ error: 'Error updating scheduleException' })
  }
}

export async function deleteScheduleException(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.scheduleException.delete({ where: { id: Number(id) } })
    res.json({ message: 'ScheduleException deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting scheduleException' })
  }
}
