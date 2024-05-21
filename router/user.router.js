const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router
    .get('/myAccount', userController.get)
    .post('/createUser', userController.create)
    .put('/updateUser', userController.update)
    .delete('/deleteUser/:email', userController.delet)

module.exports = router