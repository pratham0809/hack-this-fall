const express =require('express');
const userController=require("../controller/user_controller")

const router =express.Router();

const { sendOTP, verifyOTP}=require('../controller/twilio-sms.js')


//const controller=require('../controller/user_controller');
//api routes

router.post('/register',userController.create)
router.post('/login',userController.login)
router.post('/verify',userController.verify);

module.exports=router