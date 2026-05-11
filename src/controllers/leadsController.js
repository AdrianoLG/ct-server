const leadsModel = require('../models/leadsModel')

async function getLeads(req, res) {
  const rows = await leadsModel.getAllLeads()
  res.json(rows)
}

async function createLead(req, res) {
  const { full_name, email, birth_date, location_id, campaign_id } = req.body
  const lead = await leadsModel.createLead({
    full_name,
    email,
    birth_date,
    location_id,
    campaign_id
  })

  res.status(201).json(lead)
}

module.exports = {
  getLeads,
  createLead
}
