const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
  name: String,
  time: Number,
  difficulty: String,
});

module.exports = mongoose.model("LeaderBoard", leaderBoardSchema);
