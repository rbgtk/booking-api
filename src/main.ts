import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`)
})

