import React, { useState, useEffect } from "react";
import LeaderBoardCard from "../components/LeaderBoardCard";
import "../styles/LeaderBoard.css";

const LeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState(null);

  const difficultyOptions = ["Hard", "Harder", "Hardest"];

  useEffect(() => {
    if (difficultyFilter) {
      const fetchLeaderBoard = async () => {
        const response = await fetch(
          `http://localhost:5000/leaderboard?difficulty=${difficultyFilter}`
        );
        const data = await response.json();
        setLeaderBoardData(data);
      };
      fetchLeaderBoard();
    }
  }, [difficultyFilter]);

  return (
    <div className="leaderboard-container">
      {difficultyOptions.map((option, index) => (
        <button key={index} onClick={() => setDifficultyFilter(option)}>
          {option}
        </button>
      ))}
      {difficultyFilter &&
        leaderBoardData.map((item, index) => (
          <LeaderBoardCard key={index} name={item.name} time={item.time} />
        ))}
    </div>
  );
};

export default LeaderBoard;
