const express =require('express');
// const userController=require("../controller/user-controller")

const router =express.Router();

const gameController=require('../controller/games');

//api routes

router.post('/create/dino',gameController.createDino)
router.post('/create/coinscrapper',gameController.createCoinscrapper);
router.post('/create/space',gameController.createSpace);
router.post('/create/doodle',gameController.createDoodle);

router.get('/dino',async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/dino.ejs',{question : quiz.question , answer: quiz.answer ,trial : false, code:quiz.code});
    }else{
        res.render('games/dino.ejs',{question : [] , answer: [] , trial : true, code:-1})
    }
});

router.get('/space',async(req,res)=>{
	let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/space.ejs',{question : quiz.question , answer: quiz.answer ,
            option: quiz.option ,trial : false, code:code});
    }else{
        res.render('games/space.ejs',{question : [] , answer: [] , option : [] ,trial : true, code: -1})
    }
});

router.get('/coinscrapper',async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/coinscrapper.ejs',{question : quiz.question , answer: quiz.answer ,trial : false, code: quiz.code});
    }else{
        res.render('games/coinscrapper.ejs',{question : [] , answer: [] , trial : true, code: -1})
    }
});

router.get('/doodle',async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/doodle.ejs',{question : quiz.question ,trial : false ,code: quiz.code});
    }else{
        res.render('games/doodle.ejs',{question : [] , trial : true ,code: -1})
    }
});


module.exports=router