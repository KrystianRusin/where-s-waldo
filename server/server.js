const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Target = require("./models/target");
const LeaderBoard = require("./models/leaderBoard");
const dotenv = require("dotenv");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrxok3y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", async function () {
  console.log("Connected to MongoDB");
});

app.get("/targets", async (req, res) => {
  try {
    const targets = await Target.find();
    res.json(targets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/checkTarget", async (req, res) => {
  console.log("Check Target" + req.query.difficulty + req.query.targetName);
  try {
    const target = await Target.findOne({
      difficulty: req.query.difficulty,
      targetName: req.query.targetName,
    });
    if (target) {
      res.json({ x: target.x, y: target.y });
    } else {
      res.status(404).json({ message: "Target not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/leaderboard", async (req, res) => {
  const leaderBoard = new LeaderBoard({
    name: req.body.name,
    time: req.body.time,
  });
  console.log(leaderBoard);
  try {
    const newLeaderBoard = await leaderBoard.save();
    res.status(201).json(newLeaderBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => console.log("Server started at port 5000"));
