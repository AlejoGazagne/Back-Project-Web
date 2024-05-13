var express = require('express')
var router = express.Router()
const { createUser, getUserByEmail } = require('../services/usuarios.service')
const { getSellerByEmail } = require('../controllers/sellers')
const { } = require('../controllers/properties')
const { generateToken } = require('../services/generateToken')

router.get('/', (req, res) => {
    res.send('Home route')

    // bring three random properties   

});

router.post('/login', async (req, res) => {
    res.send('Login route')

    const user = await getUserByEmail(req.body.email)

    if(user == null){
        const seller = getSellerByEmail(req.body.email)
        if(seller == null){
            res.status(404).send('User not found')
        } else {
            const token = generateToken(seller)
            console.log(token)
        }
        
    } else {
        const token = generateToken(user)
        console.log(token)
    }
});



module.exports = router;