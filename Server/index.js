require('dotenv').config();
const express =require('express');

const twilioRouter=require('./routes/twilio-sms') 
const app = express();

const {PORT} = process.env;
const port = 8000 || PORT;

const jsonParser = express.json();
app.use(jsonParser); 
app.use('/twilio-sms', twilioRouter);

app.get('/', () => {
console.log("App Demo");
})
app.post('/twilio-sms/send-otp',(req,res)=>{
    app.use(twilioRouter);
    console.log("Send SMS");
})
app.listen(port, () => {
    console.log(`Server started listen to the port ${port}`);
})