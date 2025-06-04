import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createLocation(req: Request, res: Response) {
  const { name, description, address, mapUrl } = req.body

  try {
    const location = await prisma.location.create({
      data: { name, description, address, mapUrl },
    })
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' })
  }
}

export async function getAllLocations(req: Request, res: Response) {
  try {
    const locations = await prisma.location.findMany()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' })
  }
}

export async function getLocationById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
    })
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location' })
  }
}

export async function updateLocation(req: Request, res: Response) {
  const { id } = req.params
  const { name, description, address, mapUrl } = req.body

  try {
    const location = await prisma.location.update({
      where: { id: Number(id) },
      data: { name, description, address, mapUrl },
    })
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' })
  }
}

export async function deleteLocation(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.location.delete({ where: { id: Number(id) } })
    res.json({ message: 'Location deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' })
  }
}
