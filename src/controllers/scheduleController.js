import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createSchedule(request, response) {
  const { scheduleType, scheduleDay, scheduleTime, scheduleDate } = request.body

  try {
    if (scheduleType === 'RECURRING') {
      const schedule = await prisma.schedule.create({
        data: { scheduleType, scheduleDay, scheduleTime },
      })
      response.json(schedule)
    } else if (scheduleType === 'ONE_TIME') {
      const schedule = await prisma.schedule.create({
        data: { scheduleType, scheduleDate },
      })
      request.json(schedule)
    } else {
      throw new Error('Invalid schedule type')
    }
  } catch (error) {
    response.status(500).json({ message: 'Error creating schedule' })
  }
}

export async function updateSchedule(request, response) {
  const { id } = request.params.scheduelId
  const { scheduleType, scheduleDay, scheduleTime, scheduleDate } = request.body

  try {
    if (scheduleType === 'RECURRING') {
      const schedule = await prisma.schedule.update({
        data: { scheduleType, scheduleDay, scheduleTime },
        where: { id: Number(id) },
      })
      request.json(schedule)
    } else if (scheduleType === 'ONE_TIME') {
      const schedule = await prisma.schedule.update({
        data: { scheduleType, scheduleDate },
        where: { id: Number(id) },
      })
      request.json(schedule)
    } else {
      throw new Error('Invalid schedule type')
    }
  } catch (error) {
    response.status(500).json({ message: 'Error updating schedule' })
  }
}

export async function deleteSchedule(request, response) {
  const { id } = request.params.scheduleId
  try {
    await prisma.schedule.delete({
      where: { id: Number(id) },
    })
    response.json({ message: 'Schedule deleted' })
  } catch (error) {
    response.status(500).json({ message: 'Error deleting schedule' })
  }
}
