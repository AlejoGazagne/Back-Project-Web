const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller");

router
    .post("/login", auth.authenticateAccount)
    .post("/register", auth.registerAccount);

module.exports = router