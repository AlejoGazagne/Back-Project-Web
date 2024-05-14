const express = require('express')
const router = express.Router()
const sellerController = require('../controllers/seller.controller')

router
    .get('/:email', sellerController.get)
    .post('/createSeller', sellerController.create)
    .put('/updateSeller', sellerController.update)
    .delete('/deleteSeller/:email', sellerController.delet)


module.exports = router;

// const { createSeller, getSellerByEmail } = require('../services/sellers.services')

// router.post('/seller/register', async (req, res) => {
//     const { email, password, name, phoneNumber } = req.body

//     console.log(email, password, name, phoneNumber)

//     const seller = await getSellerByEmail(email)
//     console.log(seller)

//     if (seller == null) {
//         const newSeller = await createSeller(email, password, name, phoneNumber)
//         res.send(newSeller)
//     }


// })