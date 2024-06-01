const express = require("express");
const router = express.Router();

const catalogueController = require('../controllers/catalogue.controller')

router
    .get('/', catalogueController.getSomePost)
    .get('/search', catalogueController.getPostsFilter)
    .get('/:id', catalogueController.getPostById)

module.exports = router;