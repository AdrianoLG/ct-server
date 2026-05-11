const db = require('../config/db')

function validateCreateLead(req, res, next) {
  const { full_name, email, location_id, campaign_id, birth_date } = req.body

  if (!full_name || !email || !location_id || !campaign_id || !birth_date) {
    return res.status(400).json({
      message:
        'Campos requeridos: full_name, email, location_id, campaign_id y birth_date'
    })
  }

  // Validate full_name: type, length and allowed characters
  if (typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({
      message: 'El campo full_name debe ser texto y tener al menos 2 caracteres'
    })
  }

  if (full_name.length > 255) {
    return res.status(400).json({
      message: 'El campo full_name no puede exceder 255 caracteres'
    })
  }

  // Allow only letters, spaces, hyphens and apostrophes
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(full_name.trim())) {
    return res.status(400).json({
      message: 'El campo full_name contiene caracteres inválidos'
    })
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({
      message: 'El campo email no tiene un formato válido'
    })
  }

  if (email.length > 255) {
    return res.status(400).json({
      message: 'El campo email no puede exceder 255 caracteres'
    })
  }

  // Validate location_id and campaign_id
  if (!Number.isInteger(location_id) || location_id <= 0) {
    return res.status(400).json({
      message: 'El campo location_id debe ser un número entero mayor a 0'
    })
  }

  if (!Number.isInteger(campaign_id) || campaign_id <= 0) {
    return res.status(400).json({
      message: 'El campo campaign_id debe ser un número entero mayor a 0'
    })
  }

  // Validate birth_date
  if (typeof birth_date !== 'string') {
    return res.status(400).json({
      message: 'El campo birth_date debe ser texto'
    })
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(birth_date)) {
    return res.status(400).json({
      message: 'El campo birth_date debe estar en formato YYYY-MM-DD'
    })
  }

  const birthDate = new Date(birth_date)
  if (isNaN(birthDate.getTime())) {
    return res.status(400).json({
      message: 'El campo birth_date contiene una fecha inválida'
    })
  }

  if (birthDate > new Date()) {
    return res.status(400).json({
      message: 'La fecha de nacimiento no puede ser posterior a hoy'
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
    return res.status(409).json({ message: 'El email está duplicado' })
  }

  next()
}

module.exports = {
  validateCreateLead,
  validateUniqueLeadEmail
}
