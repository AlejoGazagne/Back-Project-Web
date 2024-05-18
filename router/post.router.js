const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

router
    .post('/createPost', postController.create)
    .delete('/deletePost/:id', postController.delet)
    .get('/getMyPosts', postController.getMyPosts)
    .put('/updatePost', postController.update)

module.exports = router;