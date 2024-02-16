import { useState } from "react";
import Nav from "./containers/Nav";
import "./App.css";
import MainContent from "./containers/MainContent";
import GameBoard from "./containers/GameBoard";
import hardImg from "./assets/hard.jpg";
import harderImg from "./assets/harder.jpg";
import hardestImg from "./assets/hardest.jpg";

function App() {
  const [level, setLevel] = useState(null);

  const changeDifficulty = (difficulty) => {
    setLevel(difficulty);
  };

  const levelImages = {
    Hard: hardImg,
    Harder: harderImg,
    Hardest: hardestImg,
  };

  const resetDifficulty = () => {
    setLevel(null);
  };

  return (
    <div className="app-container">
      <Nav resetDifficulty={resetDifficulty} />
      <div className="game-container">
        {level ? (
          <GameBoard img={levelImages[level]} difficulty={level} />
        ) : (
          <MainContent setLevel={changeDifficulty} />
        )}
      </div>
    </div>
  );
}

export default App;
