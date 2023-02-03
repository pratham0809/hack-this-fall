const express =require('express');
// const userController=require("../controller/user-controller")

const router =express.Router();

const dashboardController=require('../controller/dashboard');
const { route } = require('./twilio-sms');

router.post('/student/educational-games',dashboardController.selectGame);
router.post('/check',dashboardController.scoreSave);