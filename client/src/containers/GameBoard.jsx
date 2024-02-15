import React, { useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ img }) => {
  const [scale, setScale] = useState(1);

  const handleWheel = (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      // Zoom in
      setScale((prevScale) => Math.min(prevScale + 0.1, 2));
    } else {
      // Zoom out
      setScale((prevScale) => Math.max(prevScale - 0.1, 1));
    }
  };

  return (
    <div className="img-container" onWheel={handleWheel}>
      <img
        src={img}
        alt="PLACEHOLDER"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
};

export default GameBoard;
