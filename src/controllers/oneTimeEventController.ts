import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createOneTimeEvent(req: Request, res: Response) {
  const { name, description, date, locationId, price } = req.body

  try {
    const oneTimeEvent = await prisma.oneTimeEvent.create({
      data: { name, description, date, locationId, price },
    })
    res.json(oneTimeEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error creating oneTimeEvent' })
  }
}

export async function getAllOneTimeEvents(req: Request, res: Response) {
  try {
    const oneTimeEvents = await prisma.oneTimeEvent.findMany()
    res.json(oneTimeEvents)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching oneTimeEvents' })
  }
}

export async function getOneTimeEventById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const oneTimeEvent = await prisma.oneTimeEvent.findUnique({
      where: { id: Number(id) },
    })
    res.json(oneTimeEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching oneTimeEvent' })
  }
}

export async function updateOneTimeEvent(req: Request, res: Response) {
  const { id } = req.params
  const { name, description, date, locationId, price } = req.body

  try {
    const oneTimeEvent = await prisma.oneTimeEvent.update({
      where: { id: Number(id) },
      data: { name, description, date, locationId, price },
    })
    res.json(oneTimeEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error updating oneTimeEvent' })
  }
}

export async function deleteOneTimeEvent(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.oneTimeEvent.delete({ where: { id: Number(id) } })
    res.json({ message: 'OneTimeEvent deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting oneTimeEvent' })
  }
}
