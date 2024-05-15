const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const sellerRouter = require("./seller.router");
const auth = require("./auth.router");
const VerifyToken = require("../middlewares/verifyToken.middleware");

router.use("/user", userRouter);
//router.use("/user", VerifyToken.verifyToken, userRouter);
router.use("/seller", VerifyToken.verifyToken, sellerRouter);
router.use("/", auth);

module.exports = router;