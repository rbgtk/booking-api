import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await prisma.scheduleTemplate.findMany()
    res.json(schedules)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedules' })
  }
}

export const getSchedulesByLocation = async (req: Request, res: Response) => {
  const { locationId } = req.params
  try {
    const schedules = await prisma.scheduleTemplate.findMany({
      where: { locationId: Number(locationId) },
    })
    res.json(schedules)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedules for location' })
  }
}

export const createSchedule = async (req: Request, res: Response) => {
  const { locationId, weekday, time } = req.body
  try {
    const schedule = await prisma.scheduleTemplate.create({
      data: { locationId, weekday, time },
    })
    res.status(201).json(schedule)
  } catch (error) {
    res.status(500).json({ error: 'Error creating schedule' })
  }
}

export const updateSchedule = async (req: Request, res: Response) => {
  const { id } = req.params
  const { weekday, time } = req.body
  try {
    const updatedSchedule = await prisma.scheduleTemplate.update({
      where: { id: Number(id) },
      data: { weekday, time },
    })
    res.json(updatedSchedule)
  } catch (error) {
    res.status(500).json({ error: 'Error updating schedule' })
  }
}

export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.scheduleTemplate.delete({ where: { id: Number(id) } })
    res.json({ message: 'Schedule deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting schedule' })
  }
}
