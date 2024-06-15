const express = require('express')
const router = express.Router()
const postRouter = require('./post.router')

const sellerController = require('../controllers/seller.controller')

router
    .get('/me', sellerController.get)
    .put('/update', sellerController.update)
    .delete('/delete', sellerController.delet)

router.use('/post', postRouter)

module.exports = router;