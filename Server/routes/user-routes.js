const express =require('express');
const userController=require("../controller/user_controller")

const router =express.Router();

//const controller=require('../controller/user_controller');
//api routes

router.post('/register',userController.create)
router.post('/login',userController.login)

module.exports=router