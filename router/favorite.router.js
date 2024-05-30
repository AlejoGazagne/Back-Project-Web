const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favorite.controller')

router
    .get('/', favoriteController.get)
    .post('/create', favoriteController.create)
    .delete('/delete/:id', favoriteController.delet)

module.exports = router