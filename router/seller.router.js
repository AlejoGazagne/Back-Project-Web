const express = require('express')
const router = express.Router()
const sellerController = require('../controllers/seller.controller')

router
    .get('/:email', sellerController.get)
    .post('/createSeller', sellerController.create)
    .put('/updateSeller', sellerController.update)
    .delete('/deleteSeller/:email', sellerController.delet)

module.exports = router;