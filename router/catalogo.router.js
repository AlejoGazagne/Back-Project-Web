const express = require("express");
const router = express.Router();

const catalogoController = require('../controllers/catalogo.controller')
const postController = require('../controllers/post.controller')

router
    .get('/all', catalogoController.getAllPost)
    .get('/getPostsFilter', catalogoController.getPostsFilter)

module.exports = router;