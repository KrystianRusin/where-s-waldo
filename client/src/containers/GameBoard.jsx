import React, { useState, useEffect, useRef } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ img }) => {
  const [scale, setScale] = useState(1);
  const [timer, setTimer] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const [timer, setTimer] = useState(0);

      if (e.deltaY < 0) {
        // Zoom in
        setScale((prevScale) => Math.min(prevScale + 0.1, 2));
      } else {
        // Zoom out
        setScale((prevScale) => Math.max(prevScale - 0.1, 1));
      }
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (img) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [img]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    console.log("x: " + x + " y: " + y);
  };

  return (
    <div className="gameboard-container" ref={containerRef}>
      <div>Time: {timer} seconds</div>
      <img
        src={img}
        alt="PLACEHOLDER"
        className="game-img"
        style={{ transform: `scale(${scale})` }}
        onClick={handleClick}
      />
    </div>
  );
};

export default GameBoard;
