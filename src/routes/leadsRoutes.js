const express = require('express')
const leadsController = require('../controllers/leadsController')
const asyncHandler = require('../middlewares/asyncHandler')
const {
  validateCreateLead,
  validateUniqueLeadEmail
} = require('../middlewares/validateLead')

const router = express.Router()

router.get('/', asyncHandler(leadsController.getLeads))
router.post(
  '/',
  validateCreateLead,
  asyncHandler(validateUniqueLeadEmail),
  asyncHandler(leadsController.createLead)
)

module.exports = router
