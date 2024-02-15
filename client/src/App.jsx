import { useState } from "react";
import Nav from "./containers/Nav";
import "./App.css";
import MainContent from "./containers/MainContent";

function App() {
  const [level, setLevel] = useState("");

  const changeDifficulty = (difficulty) => {
    setLevel(difficulty);
  };

  return (
    <div className="app-container">
      <Nav />
      <MainContent setLevel={changeDifficulty} />
    </div>
  );
}

export default App;
