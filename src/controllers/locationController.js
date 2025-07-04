import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createLocation(req, res) {
  const { name, summary, description, address, mapUrl } = req.body

  try {
    const location = await prisma.location.create({
      data: { name, summary, description, address, mapUrl },
    })
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' })
  }
}

export async function getLocations(req, res) {
  try {
    const locations = await prisma.location.findMany()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' })
  }
}

export async function updateLocation(req, res) {
  const { id } = req.params
  const { name, summary, description, address, mapUrl } = req.body

  try {
    const location = await prisma.location.update({
      where: { id: Number(id) },
      data: { name, summary, description, address, mapUrl },
    })

    res.json(location)
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' })
  }
}

export async function deleteLocation(req, res) {
  const { id } = req.params

  try {
    await prisma.location.delete({ where: { id: Number(id) } })
    res.json({ message: 'Location deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' })
  }
}
