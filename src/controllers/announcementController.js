import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createAnnouncement(req, res) {
  const { title, message, dateFrom, dateTo } = req.body

  try {
    const announcement = await prisma.announcement.create({
      data: { title, message, dateFrom: new Date(dateFrom), dateTo: new Date(dateTo) },
    })
    res.json(announcement)
  } catch (error) {
    res.status(500).json({ error: 'Error creating announcement' })
  }
}

export async function getAllAnnouncements(req, res) {
  try {
    const announcements = await prisma.announcement.findMany()
    res.json(announcements)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements' })
  }
}

export async function getAnnouncementById(req, res) {
  const { id } = req.params

  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id: Number(id) },
    })
    res.json(announcement)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcement' })
  }
}

export async function updateAnnouncement(req, res) {
  const { id } = req.params
  const { title, message, dateFrom, dateTo } = req.body

  try {
    const announcement = await prisma.announcement.update({
      where: { id: Number(id) },
      data: { title, message, dateFrom: new Date(dateFrom), dateTo: new Date(dateTo) },
    })
    res.json(announcement)
  } catch (error) {
    res.status(500).json({ error: 'Error updating announcement' })
  }
}

export async function deleteAnnouncement(req, res) {
  const { id } = req.params

  try {
    await prisma.announcement.delete({
      where: { id: Number(id) },
    })
    res.json({ message: 'Announcement deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting announcement' })
  }
}
