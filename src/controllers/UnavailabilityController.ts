import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createUnavailability(req: Request, res: Response) {
  const { date, locationId, reason } = req.body

  try {
    const unavailability = await prisma.unavailability.create({
      data: { date, location: { connect: { id: locationId } }, reason },
    })
    res.json(unavailability)
  } catch (error) {
    res.status(500).json({ error: 'Error creating unavailability' })
  }
}

export async function getAllUnavailabilitys(req: Request, res: Response) {
  try {
    const unavailabilitys = await prisma.unavailability.findMany()
    res.json(unavailabilitys)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unavailabilitys' })
  }
}

export async function getUnavailabilityById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const unavailability = await prisma.unavailability.findUnique({
      where: { id: Number(id) },
    })
    res.json(unavailability)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unavailability' })
  }
}

export async function updateUnavailability(req: Request, res: Response) {
  const { id } = req.params
  const { date, locationId, reason } = req.body

  try {
    const unavailability = await prisma.unavailability.update({
      where: { id: Number(id) },
      data: { date, location: { connect: { id: locationId } }, reason },
    })
    res.json(unavailability)
  } catch (error) {
    res.status(500).json({ error: 'Error updating unavailability' })
  }
}

export async function deleteUnavailability(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.unavailability.delete({ where: { id: Number(id) } })
    res.json({ message: 'Unavailability deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting unavailability' })
  }
}
