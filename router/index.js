const express = require('express')
const router = express.Router()

const userRouter = require('./user.router')
const sellerRouter = require('./seller.router')
const auth = require('./auth.router')

router.use('/user', userRouter)
router.use('/seller', sellerRouter)
router.use('/', auth)   

// const { getSellerByEmail } = require('../services/sellers.services')
// const { } = require('../services/properties.services')
// const { generateToken } = require('../services/generateToken')

// router.get('/', (req, res) => {
//   res.send('Home route')

//   // bring three random properties   

// });

// router.post('/login', async (req, res) => {
//   res.send('Login route')

//   const user = await getUserByEmail(req.body.email)

//   if (user == null) {
//     const seller = getSellerByEmail(req.body.email)
//     if (seller == null) {
//       res.status(404).send('User not found')
//     } else {
//       const token = generateToken(seller)
//       console.log(token)
//     }

//   } else {
//     const token = generateToken(user)
//     console.log(token)
//   }
// });

module.exports = router;