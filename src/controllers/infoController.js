const infoModel = require('../models/infoModel')

async function getInfo(req, res) {
  const info = await infoModel.getInfo()
  res.json(info)
}

module.exports = { getInfo }
