function validateCreateLead(req, res, next) {
  const { name, email, phone, location_id, campaign_id } = req.body

  if (!name || !email || !phone || !location_id || !campaign_id) {
    return res.status(400).json({
      message:
        'Campos requeridos: name, email, phone, location_id y campaign_id'
    })
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      message: 'El campo name debe ser texto y tener al menos 2 caracteres'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({
      message: 'El campo email no tiene un formato valido'
    })
  }

  if (typeof phone !== 'string' || phone.trim().length < 6) {
    return res.status(400).json({
      message: 'El campo phone debe ser texto y tener al menos 6 caracteres'
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

module.exports = {
  validateCreateLead
}
