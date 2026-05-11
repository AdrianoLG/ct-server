const db = require('../config/db')

async function getAllLeads() {
  const [rows] = await db.query(`
    SELECT
      leads.*,
      locations.city_name AS location_name,
      campaigns.name AS campaign_name
    FROM leads
    LEFT JOIN locations ON leads.location_id = locations.id
    LEFT JOIN campaigns ON leads.campaign_id = campaigns.id
  `)

  return rows
}

async function createLead({ name, email, phone, location_id, campaign_id }) {
  const [result] = await db.query(
    `
    INSERT INTO leads
      (name, email, phone, location_id, campaign_id)
    VALUES
      (?, ?, ?, ?, ?)
    `,
    [name, email, phone, location_id, campaign_id]
  )

  return {
    id: result.insertId,
    name,
    email,
    phone,
    location_id,
    campaign_id
  }
}

module.exports = {
  getAllLeads,
  createLead
}
