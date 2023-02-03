const express =require('express');
//const sendOTP=require('../controller/twilio-sms')
//const { sendOTP, verifyOTP }=require=('../controller/twilio-sms');
//import {sendOTP} from '../controller/twilio-sms'

const { sendOTP, verifyOTP}=require('../controller/twilio-sms.js')
const router =express.Router();

// router.route('/send-otp',(req,res)=>{
//     req.post(sendOTP);
// })
// router.route('/verify-otp',(req,res)=>{
//     req.post(verifyOTP);
// })
router.route('/send-otp').post(sendOTP);
router.route('/send-otp').post(verifyOTP);

module.exports=router;



