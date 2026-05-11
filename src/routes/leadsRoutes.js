const express = require('express')
const leadsController = require('../controllers/leadsController')
const asyncHandler = require('../middlewares/asyncHandler')
const { validateCreateLead } = require('../middlewares/validateLead')

const router = express.Router()

router.get('/', asyncHandler(leadsController.getLeads))
router.post('/', validateCreateLead, asyncHandler(leadsController.createLead))

module.exports = router
