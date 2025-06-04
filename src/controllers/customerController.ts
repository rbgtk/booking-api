import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function createCustomer(req: Request, res: Response) {
  const { name, email, phone } = req.body

  try {
    const customer = await prisma.customer.create({
      data: { name, email, phone },
    })
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: 'Error creating customer' })
  }
}

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const customers = await prisma.customer.findMany()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customers' })
  }
}

export async function getCustomerById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const customer = await prisma.customer.findUnique({ where: { id: Number(id) } })
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customer' })
  }
}

export async function updateCustomer(req: Request, res: Response) {
  const { id } = req.params
  const { name, email, phone } = req.body

  try {
    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: { name, email, phone },
    })
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: 'Error updating customer' })
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.customer.delete({ where: { id: Number(id) } })
    res.json({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting customer' })
  }
}
