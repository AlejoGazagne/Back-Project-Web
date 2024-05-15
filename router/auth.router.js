const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller");

router
    .post("/login", auth.autentificarUsuario)
    .post("/register");

module.exports = router