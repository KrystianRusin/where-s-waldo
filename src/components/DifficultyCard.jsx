import React from "react";
import "../styles/DifficultyCard.css";

const DifficultyCard = ({ img, difficulty, setLevel }) => {
  const changeDifficulty = () => {
    setLevel(difficulty);
  };

  return (
    <div className="difficulty-card-container" onClick={changeDifficulty}>
      <img src={img} alt="difficulty" />
      <h2>{difficulty}</h2>
    </div>
  );
};

export default DifficultyCard;
