import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAvailableDates(request, response) {
  const { days } = request.query

  try {
    const events = await prisma.event.findMany({
      include: {
        location: true,
        schedules: {
          where: {
            OR: [
              {
                type: 'RECURRING',
              },
              {
                type: 'ONE_TIME',
                date: {
                  gte: new Date(),
                },
              },
            ],
          },
        },
      },
    })

    const unavailabilities = await prisma.unavailability.findMany({
      include: {
        location: true,
      },
    })

    const possibleDates = generatePossibleDates(events, days)
    const blockedDates = calculateBlockedDates(unavailabilities)
    const allowedDates = new Set([...possibleDates].filter((date) => !blockedDates.has(date)))

    response.json(Array.from(allowedDates))
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Error fetching available dates' })
  }
}

function generatePossibleDates(events, days) {
  const possibleDates = new Set()
  const today = new Date()

  events.forEach((event) => {
    event.schedules.forEach((schedule) => {
      if (schedule.type === 'ONE_TIME') {
        const date = new Date(schedule.date).toISOString().split('T')[0]
        possibleDates.add(date)
      } else if (schedule.type === 'RECURRING') {
        // Project recurring dates for the next X days
        for (let i = 0; i < days; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() + i)

          if (date.getDay() === weekdayStringToInt(schedule.weekday)) {
            const dateString = date.toISOString().split('T')[0]
            possibleDates.add(dateString)
          }
        }
      }
    })
  })

  return possibleDates
}

function weekdayStringToInt(weekday) {
  const weekdayMap = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  }

  return weekdayMap[weekday] ?? null
}

function calculateBlockedDates(unavailabilities) {
  const blockedDates = new Set()

  unavailabilities.forEach((unavailability) => {
    if (unavailability.location === null) {
      const start = new Date(unavailability.startDate)
      const end = new Date(unavailability.endDate)

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        blockedDates.add(new Date(d).toISOString().split('T')[0])
      }
    }
  })

  return blockedDates
}
