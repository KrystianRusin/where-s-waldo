import React from "react";
import "../styles/MainContent.css";
import DifficultyCard from "../components/DifficultyCard";
import NameModal from "../components/NameModal";
import hardImg from "../assets/hard.jpg";
import harderImg from "../assets/harder.jpg";
import hardestImg from "../assets/hardest.jpg";

const MainContent = ({ setLevel }) => {
  return (
    <div className="main-content-container">
      <DifficultyCard img={hardImg} difficulty="Hard" setLevel={setLevel} />
      <DifficultyCard img={harderImg} difficulty="Harder" setLevel={setLevel} />
      <DifficultyCard
        img={hardestImg}
        difficulty="Hardest"
        setLevel={setLevel}
      />
    </div>
  );
};

export default MainContent;
