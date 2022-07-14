const express = require("express");
const router = express.Router();
const passport=require('../modules/passport');

//Contest
const contestApiRouter = require('./contests');
router.use('/contests',passport.authenticate('jwt',{ session: false }) ,contestApiRouter);
//router.use('/contests', contestApiRouter);
//Login
const loginApiRouter=require('./login');
router.use('/noneAuthen',loginApiRouter);

module.exports = router;