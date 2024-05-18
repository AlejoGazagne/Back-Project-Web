const express = require("express");
const router = express.Router();

const catalogueController = require('../controllers/catalogue.controller')
//const postController = require('../controllers/post.controller')

router
    .get('/', catalogueController.getSomePost)
    .get('/getPostsFilter', catalogueController.getPostsFilter)
    .get('/:id', catalogueController.getPostById)

module.exports = router;