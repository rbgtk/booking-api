import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

// Read credentials from environment variables (or hardcode for dev)
const email = process.env.ADMIN_EMAIL || 'admin@example.com'
const password = process.env.ADMIN_PASSWORD || 'admin123' // Use strong password in production!

// Create the database client
const prisma = new PrismaClient()

async function main() {
  console.log(`Creating admin with email: ${email}`)

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({ where: { email } })
  if (existingAdmin) {
    console.log('Admin already exists.')
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create admin
  const newAdmin = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      userRole: 'Admin',
    },
  })

  console.log('✅ Admin created:', newAdmin)
}

main()
  .catch((error) => {
    console.error('Error creating admin:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
