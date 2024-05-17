const express = require('express')
const router = express.Router()
const postRouter = require('./post.router')

const sellerController = require('../controllers/seller.controller')

router
    .get('/:email', sellerController.get)
    .post('/createSeller', sellerController.create)
    .put('/updateSeller', sellerController.update)
    .delete('/deleteSeller/:email', sellerController.delet)

router.use('/post', postRouter)

module.exports = router;