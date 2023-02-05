//const User=require("./model/user")
const bcrypt=require('bcryptjs')
const dotenv=require("dotenv");
//dotenv.config({path:'config.env'})\
require('dotenv').config();
const User = require("../models/user");

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = require('twilio') (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
})

exports.create=async(req,res)=>{
    try{
		console.log("Register");
		const {name,email,password,phoneNumber,role,countryCode}=req.body;
		//const countryCode="91";
		if(!(email&&password&&name&&phoneNumber&&role)){
			return res.status(400).send("All field is require");
		}
		const oldUser=await User.findOne({email});
		if(oldUser){
			return res.status(401).send("User already exists");
		}
		if(password.length < 8){
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters'
			})
		}
		encryptedPassword=await bcrypt.hash(password,10);

        if(phoneNumber.length<10 && phoneNumber.length>10){
            return res.json({
                status:'error',
                error:'Phone Number is not valid'
            })
        }
		const user=await User.create({
			name,
			email:email.toLowerCase(),
			password: encryptedPassword,
			phoneNumber,
			role
		});
		const otpResponse = await client.verify.services (TWILIO_SERVICE_SID)
        .verifications.create({
		to:`+${countryCode}${phoneNumber}`,
        channel: "sms",
        });
		
        //res.status(200).send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`);
		//res.send("User Registered")
		res.redirect('/verify');
    }
    catch(err){
		console.log(err);
	}
}

exports.login=async(req,res)=>
{
	try{
		const{email,password}=req.body;
		console.log("Login");
		if(!(email&&password)){
			return res.status(400).send("Email and password both required")
		}
		const user=await User.findOne({email});
		//console.log(user);
		const validPassword=await bcrypt.compare(password,user.password);
		if(validPassword){
			req.session.user_id=user._id;
			console.log(req.session.user_id);
			if(user.role=='student'){
				req.session.valid=user.name;
				res.redirect('/student/analytics');
			}
			else{
				res.redirect('/teacher/analytics');
			}

			//return res.json({ status: 'ok', data: token })

            //res.redirect('/');
		}
		//res.status(400).send("Invalid Credentials");
	}
	catch(err){
		console.log(err);
	}
}

exports.verify=async(req, res)=>{
	console.log("OTP Verification");
	session=req.session;
    const {otp,phoneNumber,countryCode} = req.body;
	console.log(otp);
	// const user_id = req.session.user._id;
	// console.log(user_id)
	//const phoneNumber=req.session.phoneNumber;
	//const countryCode=req.session.countryCode;
	
	console.log(phoneNumber);
	console.log(countryCode);

    try{
        const verifiedResponse = await client.verify
        .services (TWILIO_SERVICE_SID)
        .verificationChecks.create({
        to:`+${countryCode}${phoneNumber}`,
        code: otp,
        }) 
    //res.status(208).send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}` ); 
	res.redirect('/login')
    }catch(error) {
        res.status(error?.status || 408).send(error?.message || 'Something went wrong!');
    }
}
