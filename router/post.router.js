const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

router
    .get('/getPosts', postController.getMyPosts)
    .post('/createPost', postController.create)

module.exports = router;