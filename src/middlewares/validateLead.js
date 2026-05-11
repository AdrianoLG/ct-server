const db = require('../config/db')

function validateCreateLead(req, res, next) {
  const { full_name, email, location_id, campaign_id, birth_date } = req.body

  if (!full_name || !email || !location_id || !campaign_id || !birth_date) {
    return res.status(400).json({
      message:
        'Required fields: full_name, email, location_id, campaign_id and birth_date'
    })
  }

  // Validate full_name: type, length and allowed characters
  if (typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({
      message: 'The full_name field must be text and have at least 2 characters'
    })
  }

  if (full_name.length > 255) {
    return res.status(400).json({
      message: 'The full_name field cannot exceed 255 characters'
    })
  }

  // Allow only letters, spaces, hyphens and apostrophes
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(full_name.trim())) {
    return res.status(400).json({
      message: 'The full_name field contains invalid characters'
    })
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({
      message: 'The email field has an invalid format'
    })
  }

  if (email.length > 255) {
    return res.status(400).json({
      message: 'The email field cannot exceed 255 characters'
    })
  }

  // Validate location_id and campaign_id
  if (!Number.isInteger(location_id) || location_id <= 0) {
    return res.status(400).json({
      message: 'The location_id field must be an integer greater than 0'
    })
  }

  if (!Number.isInteger(campaign_id) || campaign_id <= 0) {
    return res.status(400).json({
      message: 'The campaign_id field must be an integer greater than 0'
    })
  }

  // Validate birth_date
  if (typeof birth_date !== 'string') {
    return res.status(400).json({
      message: 'The birth_date field must be text'
    })
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(birth_date)) {
    return res.status(400).json({
      message: 'The birth_date field must be in YYYY-MM-DD format'
    })
  }

  const birthDate = new Date(birth_date)
  if (isNaN(birthDate.getTime())) {
    return res.status(400).json({
      message: 'The birth_date field contains an invalid date'
    })
  }

  if (birthDate > new Date()) {
    return res.status(400).json({
      message: 'The birth date cannot be later than today'
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
    return res.status(409).json({ message: 'The email is already in use' })
  }

  next()
}

module.exports = {
  validateCreateLead,
  validateUniqueLeadEmail
}
