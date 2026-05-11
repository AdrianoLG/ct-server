const db = require('../config/db')

async function getReport() {
  const [campaigns] = await db.query(`
    SELECT
      campaigns.name AS campaignName,
      COUNT(leads.id) AS totalLeads,
      (
        SELECT locations.city_name
        FROM leads AS leadByCity
        INNER JOIN locations ON locations.id = leadByCity.location_id
        WHERE leadByCity.campaign_id = campaigns.id
        GROUP BY locations.id, locations.city_name
        ORDER BY COUNT(leadByCity.id) DESC, locations.city_name ASC
        LIMIT 1
      ) AS topContributingCity
    FROM campaigns
    LEFT JOIN leads ON leads.campaign_id = campaigns.id
    GROUP BY campaigns.id, campaigns.name
    ORDER BY campaigns.name ASC
  `)

  return { campaigns }
}

module.exports = { getReport }
