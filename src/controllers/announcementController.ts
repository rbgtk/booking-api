import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createAnnouncement(req: Request, res: Response) {
  const { title, message, dateFrom, dateTo } = req.body

  try {
    const announcement = await prisma.announcement.create({
      data: { title, message, dateFrom, dateTo },
    })
    res.json(announcement)
  } catch (error) {
    res.status(500).json({ error: 'Error creating announcement' })
  }
}

export async function getAllAnnouncements(req: Request, res: Response) {
  try {
    const announcements = await prisma.announcement.findMany()
    res.json(announcements)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements' })
  }
}

export async function getAnnouncementById(req: Request, res: Response) {
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

export async function updateAnnouncement(req: Request, res: Response) {
  const { id } = req.params
  const { title, message, dateFrom, dateTo } = req.body

  try {
    const announcement = await prisma.announcement.update({
      where: { id: Number(id) },
      data: { title, message, dateFrom, dateTo },
    })
    res.json(announcement)
  } catch (error) {
    res.status(500).json({ error: 'Error updating announcement' })
  }
}

export async function deleteAnnouncement(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.announcement.delete({
      where: { id: Number(id) }
    })
    res.json({ message: 'Announcement deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting announcement' })
  }
}
