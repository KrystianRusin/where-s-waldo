import React, { useState, useEffect } from "react";
import "../styles/LeaderBoard.css";

const LeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState(null);

  const difficultyOptions = ["Hard", "Harder", "Hardest"];

  useEffect(() => {
    if (difficultyFilter) {
      const fetchLeaderBoard = async () => {
        const response = await fetch(
          `https://where-waldo-api.adaptable.app/leaderboard?difficulty=${difficultyFilter}`
        );
        const data = await response.json();
        setLeaderBoardData(data);
      };
      fetchLeaderBoard();
    }
  }, [difficultyFilter]);

  return (
    <div className="leaderboard-container">
      <div className="button-container">
        {difficultyOptions.map((option, index) => (
          <button
            className="filter-button"
            key={index}
            onClick={() => setDifficultyFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {difficultyFilter && (
        <div className="leaderboard-grid">
          <div className="leaderboard-header">Place</div>
          <div className="leaderboard-header">Name</div>
          <div className="leaderboard-header">Time</div>
          <div className="leaderboard-header">Date</div>
          {leaderBoardData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="leaderboard-cell">{index + 1}</div>
              <div className="leaderboard-cell">{item.name}</div>
              <div className="leaderboard-cell">{item.time} Seconds</div>
              <div className="leaderboard-cell">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
