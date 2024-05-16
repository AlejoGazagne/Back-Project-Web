const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller')

router
    .get('/', homeController.getThreeProperties)

module.exports = router