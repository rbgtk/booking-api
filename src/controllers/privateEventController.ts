import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPrivateEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.privateEvent.findMany()
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching private events' })
  }
}

export const getPrivateEventById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const event = await prisma.privateEvent.findUnique({
      where: { id: Number(id) },
    })
    if (!event) {
      return res.status(404).json({ error: 'Private event not found' })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching private event' })
  }
}

export const createPrivateEvent = async (req: Request, res: Response) => {
  const { date, time, locationId, guestName, guestEmail, guestPhone, notes } =
    req.body
  try {
    const newEvent = await prisma.privateEvent.create({
      data: {
        date: new Date(date),
        time,
        locationId,
        guestName,
        guestEmail,
        guestPhone,
        notes,
      },
    })
    res.status(201).json(newEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error creating private event' })
  }
}

export const updatePrivateEvent = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status, paymentStatus, notes } = req.body
  try {
    const updatedEvent = await prisma.privateEvent.update({
      where: { id: Number(id) },
      data: { status, paymentStatus, notes },
    })
    res.json(updatedEvent)
  } catch (error) {
    res.status(500).json({ error: 'Error updating private event' })
  }
}

export const deletePrivateEvent = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.privateEvent.delete({ where: { id: Number(id) } })
    res.json({ message: 'Private event deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting private event' })
  }
}
