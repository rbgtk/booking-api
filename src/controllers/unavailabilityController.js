import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUnavailability(req, res) {
  const { daterange, locationId, reason } = req.body

  try {
    const data = {
      dateFrom: new Date(daterange[0]),
      dateTo: new Date(daterange[1]),
      reason,
    }

    if (locationId) {
      data.location = { connect: { id: locationId } }
    }

    const unavailability = await prisma.unavailability.create({ data })
    res.json(unavailability)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating unavailability' })
  }
}

export async function getUnavailabilities(req, res) {
  try {
    const unavailabilities = await prisma.unavailability.findMany({
      include: {
        location: true,
      },
    })
    res.json(unavailabilities)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unavailabilities' })
  }
}

export async function updateUnavailability(req, res) {
  const { id } = req.params
  const { daterange, locationId, reason } = req.body

  try {
    const data = {
      dateFrom: new Date(daterange[0]),
      dateTo: new Date(daterange[1]),
      reason,
    }

    if (locationId) {
      data.location = { connect: { id: locationId } }
    }

    const unavailability = await prisma.unavailability.update({ data, where: { id: Number(id) } })
    res.json(unavailability)
  } catch (error) {
    res.status(500).json({ error: 'Error updating unavailability' })
  }
}

export async function deleteUnavailability(req, res) {
  const { id } = req.params

  try {
    await prisma.unavailability.delete({ where: { id: Number(id) } })
    res.json({ message: 'Unavailability deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting unavailability' })
  }
}
