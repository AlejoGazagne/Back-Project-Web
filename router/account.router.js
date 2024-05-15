const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller");
const register = require("../controllers/register.controller");

router
    .post("/login", auth.authenticateAccount)
    .post("/register", register.registerAccount);

module.exports = router