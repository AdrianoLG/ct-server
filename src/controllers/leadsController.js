const leadsModel = require('../models/leadsModel')

async function getLeads(req, res) {
  const rows = await leadsModel.getAllLeads()
  res.json(rows)
}

async function createLead(req, res) {
  const { name, email, phone, location_id, campaign_id } = req.body
  const lead = await leadsModel.createLead({
    name,
    email,
    phone,
    location_id,
    campaign_id
  })

  res.status(201).json(lead)
}

module.exports = {
  getLeads,
  createLead
}
