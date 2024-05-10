var express = require('express')
var router = express.Router()

const {createSeller, getSellerByEmail} = require('../../controllers/sellers')

router.post('/seller/register', async (req, res) => {
    const {email, password, name, phoneNumber} = req.body

    console.log(email, password, name, phoneNumber)
    
    const seller = await getSellerByEmail(email)
    console.log(seller)
    
    if(seller == null){
        const newSeller = await createSeller(email, password, name, phoneNumber)
        res.send(newSeller)
    }
    
    
})

module.exports = router;