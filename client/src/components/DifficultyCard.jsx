import React from "react";
import "../styles/DifficultyCard.css";

const DifficultyCard = ({ img, difficulty }) => {
  return (
    <div className="difficulty-card-container">
      <img src={img} alt="difficulty" />
      <h2>{difficulty}</h2>
    </div>
  );
};

export default DifficultyCard;
