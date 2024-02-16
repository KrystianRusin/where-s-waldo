import React, { useState, useEffect, useRef } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ img, difficulty }) => {
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
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("x: " + x + " y: " + y);

    if (showDropdown) {
      setShowDropdown(false);
      setClickPosition(null);
      return;
    }

    setClickPosition({ x, y });
    setDropdownPosition({ x: e.clientX, y: e.clientY });
    setShowDropdown(true);
  };

  const handleCharacterSelect = async (character) => {
    console.log(
      "Found " +
        character +
        " at x: " +
        clickPosition.x +
        " y: " +
        clickPosition.y
    );

    checkTarget("Hard", character);

    setShowDropdown(false);
    setClickPosition(null);
  };

  const checkTarget = async (targetName) => {
    const response = await fetch(
      `http://localhost:5000/checkTarget?difficulty=${difficulty}&targetName=${targetName}`
    );

    // Log the raw response text
    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);
      const circleCenter = { x: clickPosition.x, y: clickPosition.y };
      const point = { x: data.x, y: data.y }; // replace with actual data coordinates
      const radius = 25; // half of the width of the circle (50px / 2)

      if (checkIfWithinCircle(circleCenter, point, radius)) {
        console.log("The point is within the circle");
      } else {
        console.log("The point is outside the circle");
      }
    } catch (err) {
      console.error("Failed to parse response text as JSON:", err);
    }
  };

  const checkIfWithinCircle = (circleCenter, point, radius) => {
    const dx = circleCenter.x - point.x;
    const dy = circleCenter.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= radius;
  };

  return (
    <div className="gameboard-container" ref={containerRef}>
      <div>Time: {timer} seconds</div>
      <div className="image-wrapper">
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
              top: `${clickPosition.y}%`,
              left: `${clickPosition.x}%`,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid red",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
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
