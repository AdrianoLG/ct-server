const express = require('express')
const leadsRoutes = require('./routes/leadsRoutes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use('/leads', leadsRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
