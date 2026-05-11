const db = require('../config/db')

async function getInfo() {
  const [[campaigns], [locations]] = await Promise.all([
    db.query('SELECT id, name FROM campaigns'),
    db.query('SELECT id, city_name FROM locations')
  ])

  return { campaigns, locations }
}

module.exports = { getInfo }
