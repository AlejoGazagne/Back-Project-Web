const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const favoriteRouter = require('./favorite.router')

router
    .get('/me', userController.get)
    .put('/update', userController.update)
    .delete('/delete', userController.delet)

router.use('/favorite', favoriteRouter)

module.exports = router