const db = require('../config/db')

function validateCreateLead(req, res, next) {
  const { full_name, email, location_id, campaign_id } = req.body

  if (!full_name || !email || !location_id || !campaign_id) {
    return res.status(400).json({
      message: 'Campos requeridos: full_name, email, location_id y campaign_id'
    })
  }

  if (typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({
      message: 'El campo full_name debe ser texto y tener al menos 2 caracteres'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({
      message: 'El campo email no tiene un formato valido'
    })
  }

  if (!Number.isInteger(location_id) || location_id <= 0) {
    return res.status(400).json({
      message: 'El campo location_id debe ser un numero entero mayor a 0'
    })
  }

  if (!Number.isInteger(campaign_id) || campaign_id <= 0) {
    return res.status(400).json({
      message: 'El campo campaign_id debe ser un numero entero mayor a 0'
    })
  }

  next()
}

async function validateUniqueLeadEmail(req, res, next) {
  const { email } = req.body

  const [existingLeadRows] = await db.query(
    `
    SELECT id
    FROM leads
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  )

  if (existingLeadRows.length > 0) {
    return res.status(409).json({ message: 'Email duplicado' })
  }

  next()
}

module.exports = {
  validateCreateLead,
  validateUniqueLeadEmail
}
