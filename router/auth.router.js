const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth.controler')

router
    .get('/login', auth.autentificarUsuario)
    .post('/register')

module.exports = router

