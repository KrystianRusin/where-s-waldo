const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
  name: String,
  time: Number,
});

module.exports = mongoose.model("LeaderBoard", leaderBoardSchema);
