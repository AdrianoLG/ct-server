const express = require('express')
const infoController = require('../controllers/infoController')
const asyncHandler = require('../middlewares/asyncHandler')

const router = express.Router()

router.get('/', asyncHandler(infoController.getInfo))

module.exports = router
