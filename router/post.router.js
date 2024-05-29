const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')

router
    .post('/create', postController.create)
    .delete('/delete/:id', postController.delet)
    .get('/my-posts', postController.getMyPosts)//cambiar nombre
    .put('/update', postController.update)

module.exports = router;