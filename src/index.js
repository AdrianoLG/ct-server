require('dotenv').config()
const express = require('express')
const cors = require('cors')
const leadsRoutes = require('./routes/leadsRoutes')
const infoRoutes = require('./routes/infoRoutes')
const reportRoutes = require('./routes/reportRoutes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

const app = express()

const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS ||
  'http://localhost:3001,http://localhost:3000'
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Origen no permitido por CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())
app.use('/leads', leadsRoutes)
app.use('/info', infoRoutes)
app.use('/report', reportRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
