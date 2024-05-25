const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const favoriteRouter = require('./favorite.router')

router
    .get('/myAccount', userController.get)
    //.post('/createUser', userController.create)
    .put('/updateUser', userController.update)
    .delete('/deleteUser', userController.delet)

router.use('/favorite', favoriteRouter)

module.exports = router