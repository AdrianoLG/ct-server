const reportModel = require('../models/reportModel')

async function getReport(req, res) {
  const report = await reportModel.getReport()
  res.json(report)
}

module.exports = { getReport }
