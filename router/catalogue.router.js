const express = require("express");
const router = express.Router();
const catalogueController = require('../controllers/catalogue.controller')

router
    .get('/search', catalogueController.getPostsFilter)
    .get('/:id', catalogueController.getPostById)

module.exports = router;