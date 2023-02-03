const mongoose=require('mongoose');
const users=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
		minlength:8
	},
    phoneNumber:{
        type:String,
        required:true,
        minlength:10,
    },
    role:{
        type:String,
        required:true
    },
    userVerify:{
        type:Boolean,
        default:false
    },
    emailVerify:{
        type:Boolean,
        default:false
    },
})

const Userdb=mongoose.model('Userdb',users);
module.exports=Userdb;