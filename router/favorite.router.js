const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favorite.controller')

router
    .get('/getFavorites', favoriteController.get)
    .post('/createFavorite', favoriteController.create)

module.exports = router