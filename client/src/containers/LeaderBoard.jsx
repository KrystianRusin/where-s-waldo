import React, { useState, useEffect } from "react";
import LeaderBoardCard from "../components/LeaderBoardCard";
import "../styles/LeaderBoard.css";

const LeaderBoard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      const response = await fetch("http://localhost:5000/leaderboard");
      const data = await response.json();
      setLeaderBoardData(data);
    };
    fetchLeaderBoard();
  }, []);

  return (
    <div className="leaderboard-container">
      {leaderBoardData.map((item, index) => (
        <LeaderBoardCard key={index} name={item.name} time={item.time} />
      ))}
    </div>
  );
};

export default LeaderBoard;
