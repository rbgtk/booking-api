import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime) {
  if (scheduleType === 'RECURRING') {
    return await prisma.schedule.create({
      data: { scheduleType, scheduleDay, scheduleTime },
    })
  } else {
    return await prisma.schedule.create({
      data: { scheduleType, scheduleDate },
    })
  }
}

export async function updateSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime) {
  if (scheduleType === 'RECURRING') {
    return await prisma.schedule.update({
      data: { scheduleType, scheduleDay, scheduleTime },
    })
  } else {
    return await prisma.schedule.update({
      data: { scheduleType, scheduleDate },
    })
  }
}

export async function deleteSchedule(scheduleId) {
  return await prisma.schedule.delete({
    where: { id: Number(scheduleId) },
  })
}
