import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import router from './router'

const app = express()
const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || 3000

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, host, () => {
  console.log(`Server running on http://localhost:${port}`)
})

