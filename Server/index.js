require('dotenv').config();
const express =require('express');
const twilioRouter=require('./routes/twilio-sms') 
const app = express();

const {PORT} = process.env;
const port = 8000 || PORT;

const jsonParser = express.json();
app.use(jsonParser); 
app.use('/twilio-sms', twilioRouter);

const User=require('./models/user')
const userRoutes=require('./routes/user-routes');
const gameRoutes=require('./routes/games')
const dashboardRoutes=require('./routes/dashboard');

const path = require('path');
//const User = require('./models/user');
const Quiz = require('./models/quiz');
const Result = require('./models/leaderboard.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const connectDB =require('./database/connection');
//const { use } = require('../../../MLH/HTF/Server/routes/twilio-sms');

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'sessionlet' }))

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views/dashboard/assets')));

app.set('views',[path.join(__dirname, 'views'),
                path.join(__dirname, 'views/dashboard/pages')]);


app.set('view engine', 'ejs');

app.post('/twilio-sms/send-otp',(req,res)=>{
    app.use(twilioRouter);
    console.log("Send SMS");
})

//mongo connection
connectDB();

//login required
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

//--------------------------------------------------------------
// Index page
app.get('/',(req,res)=>{
    res.render('index2.ejs');
});


//------------------------------------------------

//register and login
//-----------------------------------------------------
app.post('/register', userRoutes);

app.get('/login',(req,res)=>{
	res.render('login.ejs')
})

app.get('/verify',(req,res)=>{
    res.render('verify.ejs');
})

app.post('/login',userRoutes)

app.post('/verify',userRoutes)

app.get('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/');
})

//-------------------------------------------------------
// create quiz for games
//dinosaur adventures

app.get('/create/dino',(req,res)=>{
    res.render('createDino.ejs');
})

app.post('/create/dino',gameRoutes);
//-----------------
// create quiz coinscrapper

app.get('/create/coinscrapper',(req,res)=>{
    res.render('createCoin.ejs');
})

app.post('/create/coinscrapper',gameRoutes);

//---------------------
//create quiz space

app.get('/create/space',(req,res)=>{
    res.render('createSpace.ejs');
})

app.post('/create/space',gameRoutes);

//----
//create quiz doodle
app.post('/create/doodle',gameRoutes);

app.get('/create/doodle',(req,res)=>{
    res.render('createDoodle.ejs');
})

//-------------------------------------------------------------------


//games start
//dino

app.get('/dino',gameRoutes);
//-----------------------------------------------
//space

app.get('/space',gameRoutes);
//----------------------------------------------
//coinscrapper

app.get('/coinscrapper',gameRoutes);

//doodle fun
//----
app.get('/doodle',async(req,res)=>{
    app.use(gameRoutes);
});

//-------------------------------------------------------------
//Dashboard


app.get('/student/dashboard',requireLogin,(req,res)=>{
    let valid = req.session.valid;
     req.session.valid = null;
	res.render('dashboard_stud.ejs',{valid});
});

app.get('/teacher/dashboard',requireLogin,(req,res)=>{
    res.render('dashboard_teacher.ejs');
});

app.get('/aboutus',(req,res)=>{
    res.render('aboutUs.ejs');
});

//--------------------------------------------------------------
//educational games


app.get('/student/educational-games',(req,res)=>{
	res.render('educational-games_stud.ejs');
});

app.post('/student/educational-games',async(req,res)=>{
    const {code} = req.body;
    console.log({code});
    const quiz = await Quiz.findOne({ code });
    console.log(quiz);
    req.session.gamecode = quiz.code;

    if (quiz.game == 'coinscrapper'){
        res.redirect('/coinscrapper')
    }else if (quiz.game == 'space invaders') {
        res.redirect('/space')
    }else if (quiz.game == 'dinosaur adventures'){
        res.redirect('/dino')
    }else if (quiz.game == 'Doodle Fun'){
        res.redirect('/doodle')
    }
})


//-----

app.get('/teacher/educational-games',(req,res)=>{
    res.render('educational-games_teacher.ejs');
});

//--------------------------------------------------
//analytics
//-----------------------------------------------
app.get('/teacher/analytics',async(req,res)=>{
    const teacher = await User.findById(req.session.user_id)
    const quiz = await Quiz.find({teacher: teacher.name});

    res.render('analytics.ejs', {quiz});
});

app.get('/student/analytics',async(req,res)=>{
    const student = await User.findById(req.session.user_id)
    const quiz = await Result.find({player_name : student.name});

    res.render('analytics_stud.ejs', {quiz});
});


//--------------------------------------------
//save score
//-----------------
app.post('/check',async(req,res) => {
    const {score, game_id} = req.body;
    const quiz = await Quiz.findOne({ game_id });
    const player = await User.findById(req.session.user_id);
    console.log(player)
    const result = new Result({
      game_id,
      player_id: req.session.user_id,
      score,
      player_name: player.name,
      teacher_name : quiz.teacher,
      game_name : quiz.game,
      game_topic : quiz.topic
    });
    result.save();
  });
//---------------------------------------

//leaderboard
app.get('/leaderboard/:code',async(req,res)=>{
  const { code } = await req.params;
  console.log(code);
  const result = await Result.find({game_id: code});
  console.log(result)
    res.render('leaderboard.ejs', {result});
});


app.listen(port, () => {
    console.log(`Server started listen to the port ${port}`);
})
