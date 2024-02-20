import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./containers/Nav";
import "./App.css";
import MainContent from "./containers/MainContent";
import NameModal from "./components/NameModal";
import GameBoard from "./containers/GameBoard";
import LeaderBoard from "./containers/LeaderBoard";
import hardImg from "./assets/hard.jpg";
import harderImg from "./assets/harder.jpg";
import hardestImg from "./assets/hardest.jpg";

function App() {
  const [level, setLevel] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(0);

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
    setIsFinished(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Nav resetDifficulty={resetDifficulty} />
        <div className="game-container">
          <Routes>
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route
              path="/"
              element={
                <>
                  {isFinished && (
                    <NameModal
                      time={timer}
                      setFinished={setIsFinished}
                      resetDifficulty={resetDifficulty}
                    />
                  )}
                  {level ? (
                    <GameBoard
                      img={levelImages[level]}
                      difficulty={level}
                      isFinished={isFinished}
                      setIsFinished={setIsFinished}
                      timer={timer}
                      setTimer={setTimer}
                    />
                  ) : (
                    <MainContent setLevel={changeDifficulty} />
                  )}
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
