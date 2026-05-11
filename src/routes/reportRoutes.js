const express = require('express')
const reportController = require('../controllers/reportController')
const asyncHandler = require('../middlewares/asyncHandler')

const router = express.Router()

router.get('/', asyncHandler(reportController.getReport))

module.exports = router
