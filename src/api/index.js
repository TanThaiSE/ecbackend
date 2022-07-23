const express = require("express");
const router = express.Router();
const passport=require('../modules/passport');
const productRouter = require('./product');
const loginApiRouter=require('./login');
const orderRouter = require('./theOrder');
const userRouter =require('./user');


router.use('/product',productRouter);
router.use('/login',loginApiRouter);
router.use('/noneAuthen',loginApiRouter);
router.use('/order',orderRouter);
router.use('/user',userRouter);


module.exports = router;