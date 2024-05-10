var express = require('express')
var router = express.Router()
const { createUser, getUserByEmail } = require('../controllers/usuarios')
const { getSellerByEmail } = require('../controllers/sellers')
const { generateToken } = require('../services/generateToken')

router.get('/', (req, res) => {
    res.send('Home route')
}); 

router.post('/login', async (req, res) => {
    res.send('Login route')

    const user = await getUserByEmail(req.body.email)

    if(user != null){
        const token = generateToken(user)
        console.log(token)
    }

    // if(user == null){
    //     const seller = getSellerByEmail(req.body.email)
    //     if(seller == null){
    //         res.status(404).send('User not found')
    //     }

    // }
});



module.exports = router;