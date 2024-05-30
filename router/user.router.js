const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const favoriteRouter = require('./favorite.router')

router
    .get('/me', userController.get)
    //.post('/createUser', userController.create)
    .put('/update', userController.update)
    .delete('/delete', userController.delet)// borrar favoritos, hacer borrado logico, fijarme nombre

router.use('/favorite', favoriteRouter)

module.exports = router