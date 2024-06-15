const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller')
const catalogueController = require('../controllers/catalogue.controller')

router
    .get('/', catalogueController.getPostsFilter)

module.exports = router