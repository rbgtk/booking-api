import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllExceptions = async (req: Request, res: Response) => {
  try {
    const exceptions = await prisma.scheduleException.findMany()
    res.json(exceptions)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exceptions' })
  }
}

export const getExceptionsByLocation = async (req: Request, res: Response) => {
  const { locationId } = req.params
  try {
    const exceptions = await prisma.scheduleException.findMany({
      where: { locationId: Number(locationId) },
    })
    res.json(exceptions)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exceptions for location' })
  }
}

export const createException = async (req: Request, res: Response) => {
  const { date, locationId, reason } = req.body
  try {
    const exception = await prisma.scheduleException.create({
      data: { date: new Date(date), locationId, reason },
    })
    res.status(201).json(exception)
  } catch (error) {
    res.status(500).json({ error: 'Error creating exception' })
  }
}

export const updateException = async (req: Request, res: Response) => {
  const { id } = req.params
  const { date, locationId, reason } = req.body
  try {
    const updatedException = await prisma.scheduleException.update({
      where: { id: Number(id) },
      data: { date: new Date(date), locationId, reason },
    })
    res.json(updatedException)
  } catch (error) {
    res.status(500).json({ error: 'Error updating exception' })
  }
}

export const deleteException = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.scheduleException.delete({ where: { id: Number(id) } })
    res.json({ message: 'Exception deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting exception' })
  }
}
