//Student Dashboard

exports.selectGame=async(req,res)=>{
    const {code} = req.body;
    console.log({code});
    const quiz = await Quiz.findOne({ code });
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
}

//Score Logic

exports.scoreSave=async(req,res) => {
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
  }

