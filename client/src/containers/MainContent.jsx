import React from "react";
import "../styles/MainContent.css";
import DifficultyCard from "../components/DifficultyCard";
import hardImg from "../assets/hard.jpg";
import harderImg from "../assets/harder.jpg";
import hardestImg from "../assets/hardest.jpg";

const MainContent = () => {
  return (
    <div className="main-content-container">
      <DifficultyCard img={hardImg} difficulty="Hard" />
      <DifficultyCard img={harderImg} difficulty="Harder" />
      <DifficultyCard img={hardestImg} difficulty="Hardest" />
    </div>
  );
};

export default MainContent;
