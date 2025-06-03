import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await prisma.location.findMany()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' })
  }
}

export const getLocationById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
    })
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    return res.json(location)
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching location' })
  }
}

export const createLocation = async (req: Request, res: Response) => {
  const { name, description, address, iframe } = req.body
  try {
    const newLocation = await prisma.location.create({
      data: { name, description, address, iframe },
    })
    res.status(201).json(newLocation)
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' })
  }
}

export const updateLocation = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, address, iframe } = req.body
  try {
    const updatedLocation = await prisma.location.update({
      where: { id: Number(id) },
      data: { name, description, address, iframe },
    })
    res.json(updatedLocation)
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' })
  }
}

export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.location.delete({ where: { id: Number(id) } })
    res.json({ message: 'Location deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' })
  }
}
