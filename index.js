const express = require('express')
const db = require('./db')

const app = express()

app.use(express.json())

app.get('/leads', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        leads.*,
        locations.city_name AS location_name,
        campaigns.name AS campaign_name
      FROM leads
      LEFT JOIN locations ON leads.location_id = locations.id
      LEFT JOIN campaigns ON leads.campaign_id = campaigns.id
    `)

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al obtener leads'
    })
  }
})

app.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, location_id, campaign_id } = req.body

    const [result] = await db.query(
      `
      INSERT INTO leads
        (name, email, phone, location_id, campaign_id)
      VALUES
        (?, ?, ?, ?, ?)
      `,
      [name, email, phone, location_id, campaign_id]
    )

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      phone,
      location_id,
      campaign_id
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al crear lead'
    })
  }
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
