import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createService(req, res) {
  const { name, summary, description, events } = req.body

  const service = await prisma.service.create({
    data: {
      name,
      summary,
      description,
      events: {
        create: events.map((event) => {
          const { price, locationId, type, date, weekday, time } = event

          if (type === 'SINGLE') {
            return {
              price,
              type,
              date: new Date(date),
              location: { connect: { id: Number(locationId) } },
            }
          } else if (type === 'RECURRING') {
            return {
              price,
              type,
              weekday,
              time,
              location: { connect: { id: Number(locationId) } },
            }
          }
        }),
      },
    },
    include: {
      events: {
        orderBy: [{ type: 'asc' }, { weekday: 'asc' }, { date: 'asc' }],
      },
    },
  })

  res.json(service)
}

export async function getServices(req, res) {
  const services = await prisma.service.findMany({
    include: {
      events: {
        orderBy: [{ type: 'asc' }, { weekday: 'asc' }, { date: 'asc' }],
      },
    },
  })

  res.json(services)
}

export async function updateService(req, res) {
  const serviceId = parseInt(req.params.id)
  const { name, summary, description, events } = req.body

  console.log(req.body)

  await prisma.event.deleteMany({
    where: {
      serviceId,
    },
  })

  const service = await prisma.service.update({
    where: { id: serviceId },
    data: {
      name,
      summary,
      description,
      events: {
        create: events.map((event) => {
          const { price, locationId, type, date, weekday, time } = event

          if (type === 'SINGLE') {
            return {
              price,
              type,
              date: new Date(date),
              location: { connect: { id: Number(locationId) } },
            }
          } else if (type === 'RECURRING') {
            return {
              price,
              type,
              weekday,
              time,
              location: { connect: { id: Number(locationId) } },
            }
          }
        }),
      },
    },
    include: {
      events: {
        orderBy: [{ type: 'asc' }, { weekday: 'asc' }, { date: 'asc' }],
      },
    },
  })

  res.json(service)
}

export async function deleteService(req, res) {
  const id = req.params.id

  await prisma.service.delete({
    where: { id: Number(id) },
  })

  res.json({ message: 'Service deleted' })
}
