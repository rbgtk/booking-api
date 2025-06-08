import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router.js'

const app = express()
const host = '127.0.0.1'
const port = 3000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`)
})
