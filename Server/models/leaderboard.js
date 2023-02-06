const mongoose = require('mongoose');


const Result = new mongoose.Schema({
    game_id: {
      type: String,
      required: true
    },

    player_name: {
      type: String,
      required: true
    },

    player_id: {
      type: String,
      required: true
    },

    score: {
      type: String,
      required: true
    },

    game_name : {
      type: String,
      required: true
    },

    teacher_name : {
      type: String,
      required: true
    },
    game_topic : {
      type: String,
      required: true

    }

})

const Resultdb = mongoose.model('Resultdb', Result);
module.exports = Resultdb;