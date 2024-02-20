import React from "react";
import "../styles/LeaderBoardCard.css";

const LeaderBoardCard = ({ name, time }) => {
  return (
    <div className="leaderboard-card-container">
      <h3>{name}</h3>
      <p>{time} seconds</p>
    </div>
  );
};

export default LeaderBoardCard;
