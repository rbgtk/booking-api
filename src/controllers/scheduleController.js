import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime) {
  if (scheduleType === 'RECURRING') {
    return await prisma.schedule.create({
      data: { scheduleType, scheduleDay, scheduleTime },
    })
  } else if (scheduleType === 'ONE_TIME') {
    return await prisma.schedule.create({
      data: { scheduleType, scheduleDate },
    })
  } else {
    throw new Error('Invalid schedule type')
  }
}

export async function updateSchedule(scheduleType, scheduleDate, scheduleDay, scheduleTime) {
  if (scheduleType === 'RECURRING') {
    return await prisma.schedule.update({
      data: { scheduleType, scheduleDay, scheduleTime },
    })
  } else if (scheduleType === 'ONE_TIME') {
    return await prisma.schedule.update({
      data: { scheduleType, scheduleDate },
    })
  } else {
    throw new Error('Invalid schedule type')
  }
}

export async function deleteSchedule(scheduleId) {
  return await prisma.schedule.delete({
    where: { id: Number(scheduleId) },
  })
}
