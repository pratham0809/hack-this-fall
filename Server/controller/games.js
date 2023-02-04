//create game Logic

//Create Dino
exports.createDino=async(req,res)=>{
    const {topic,question,answer} = req.body;
    let gcode = Math.floor(100000 + Math.random() * 900000).toString();
    const teacher = await User.findById(req.session.user_id);
    const quiz = new Quiz({
        topic ,
        game : 'dinosaur adventures',
        code: gcode,
        teacher: teacher.name,
        question,
        answer
    });

    await quiz.save();
    res.render('gamecode.ejs',{gcode});
}

//Create CoinScrapper
exports.createCoinscrapper=async(req,res)=>{
    const {topic,question,answer} = req.body;
    let gcode = Math.floor(100000 + Math.random() * 900000).toString();
    const teacher = await User.findById(req.session.user_id);
    const quiz = new Quiz({
        topic ,
        game : 'coinscrapper',
        code: gcode,
        teacher: teacher.name,
        question,
        answer
    });

    await quiz.save();
    res.render('gamecode.ejs',{gcode});

}

//Create Space
exports.createSpace=async(req,res)=>{
    const {topic,question,option,answer} = req.body;
    let gcode = Math.floor(100000 + Math.random() * 900000).toString();
    const teacher = await User.findById(req.session.user_id);
    const quiz = new Quiz({
        topic ,
        game : 'space invaders',
        code: gcode,
        teacher: teacher.name,
        question,
        answer,
        option
    });

    await quiz.save();
    res.render('gamecode.ejs',{gcode});

}

//Create Doodle
exports.createDoodle=async(req,res)=>{
    const {question} = req.body;
    console.log(question);
    const teacher = await User.findById(req.session.user_id);
    
    let gcode = Math.floor(100000 + Math.random() * 900000).toString();
    const quiz = new Quiz({ 
        topic : 'Doodle for Fun',
        game : 'Doodle Fun',
        code: gcode,
        teacher: teacher.name,
        question,
    });

    await quiz.save();
    res.render('gamecode.ejs',{gcode});  
}

//Game Start Logic

//Dino Start
exports.dino=async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/dino.ejs',{question : quiz.question , answer: quiz.answer ,trial : false, code:quiz.code});
    }else{
        res.render('games/dino.ejs',{question : [] , answer: [] , trial : true, code:-1})
    }
}

//Space Start
exports.space=async(req,res)=>{
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
}

//Coinscrapper Start
exports.coinscrapper=async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/coinscrapper.ejs',{question : quiz.question , answer: quiz.answer ,trial : false, code: quiz.code});
    }else{
        res.render('games/coinscrapper.ejs',{question : [] , answer: [] , trial : true, code: -1})
    }

}

//Doodle Start
exports.doodle=async(req,res)=>{
    let code = req.session.gamecode;
    if (code != null){
        req.session.gamecode = null;
        const quiz = await Quiz.findOne({ code });
        console.log(quiz);
        res.render('games/doodle.ejs',{question : quiz.question ,trial : false ,code: quiz.code});
    }else{
        res.render('games/doodle.ejs',{question : [] , trial : true ,code: -1})
    }
}
