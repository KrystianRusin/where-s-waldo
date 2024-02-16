import React, { useState, useEffect, useRef } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ img }) => {
  const [scale, setScale] = useState(1);
  const [timer, setTimer] = useState(0);
  const containerRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState(null);

  const characters = ["Waldo", "Wizard Whitebeard"];

  //useEffect to handle user zooming in/out
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      e.target.style.transformOrigin = `${x}% ${y}%`;

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

  //useEffect Hook to handle timer
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

  //Gather coordinates of user click
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    console.log("x: " + x + " y: " + y);

    if (showDropdown) {
      setShowDropdown(false);
      setClickPosition(null);
      return;
    }

    setClickPosition({ x: e.clientX, y: e.clientY });
    setDropdownPosition({ x: e.clientX, y: e.clientY });
    setShowDropdown(true);
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
      {clickPosition && (
        <div
          className="target-circle"
          style={{
            position: "absolute",
            top: clickPosition.y,
            left: clickPosition.x,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid red",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {showDropdown && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: dropdownPosition.y,
            left: dropdownPosition.x,
          }}
        >
          {characters.map((character) => (
            <div
              key={character}
              onClick={() => handleCharacterSelect(character)}
              className="character-option"
            >
              {character}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
