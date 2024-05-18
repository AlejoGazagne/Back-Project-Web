const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const sellerRouter = require("./seller.router");
const account = require("./account.router");
const home = require("./home.router");
const catalogue = require('./catalogue.router')
const VerifyToken = require("../middlewares/verifyToken.middleware");

// router.use("/user", userRouter);
// router.use("/seller", sellerRouter);
router.use("/account", account);

router.use("/", home) //traer 3 casas
router.use("/user", VerifyToken.verifyTokenUser, userRouter);
router.use("/seller", VerifyToken.verifyTokenSeller, sellerRouter);
router.use('/catalogue', catalogue)

module.exports = router;