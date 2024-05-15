const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const sellerRouter = require("./seller.router");
const account = require("./account.router");
const VerifyToken = require("../middlewares/verifyToken.middleware");

router.use("/user", userRouter);
router.use("/seller", sellerRouter);
router.use("/account", account);

//route.use("/",) //traer 3 casas
//router.use("/user", VerifyToken.verifyToken, userRouter);
//router.use("/seller", VerifyToken.verifyToken, sellerRouter);


module.exports = router;