import React, { useState, useEffect, useRef } from "react";
import checkTarget from "../utils/checkTarget";
import "../styles/GameBoard.css";
import checkmark from "../assets/checkmark.png";

const GameBoard = ({
  img,
  difficulty,
  isFinished,
  setIsFinished,
  timer,
  setTimer,
}) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const [foundTargets, setFoundTargets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState(null);

  const characters = ["Waldo", "Wizard Whitebeard"];

  // TODO MAKE IT SO THAT GAME CHECKS THAT BOTH TARGETS HAVE BEEN FOUND NOT JUST ONE TWICE

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

  //useEffect to handle timer
  useEffect(() => {
    // If images is loaded and game is not finished incremenet the timer
    if (img && !isFinished) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [img, isFinished]);

  useEffect(() => {
    if (isFinished) {
      console.log("Game finished!");
    }
  }, [isFinished]);

  //Gather coordinates of user click as a percentage for responsiveness and display drop down menu
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("CLICK LOCATION:" + "x: " + x + " y: " + y);
    console.log(
      "CIRCLE LOCATION: " +
        "x: " +
        (x - 2.5 / scale) +
        "y: " +
        (y - 2.5 / scale)
    );

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

    const target = await checkTarget(
      difficulty,
      character,
      clickPosition,
      containerRef.current.getBoundingClientRect().width
    );

    if (target && !foundTargets.includes(character)) {
      setFoundTargets((prevFoundTargets) => {
        const newFoundTargets = [...prevFoundTargets, character];

        if (newFoundTargets.length === characters.length) {
          setIsFinished(true);
        }

        return newFoundTargets;
      });
    }

    setShowDropdown(false);
    setClickPosition(null);
  };

  return (
    <>
      <div className="gameboard-container" ref={containerRef}>
        <div>Time: {timer} seconds</div>
        <div className="image-wrapper" style={{ position: "relative" }}>
          <img
            src={img}
            alt="PLACEHOLDER"
            className="game-img"
            style={{ transform: `scale(${scale})`, position: "relative" }}
            onClick={handleClick}
          />
        </div>
        {clickPosition && (
          <div
            className="target-circle"
            style={{
              position: "absolute",
              top: `calc(${dropdownPosition.y}px - 1.5%)`,
              left: `calc(${dropdownPosition.x}px - 1.5%)`,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid red",
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
                {foundTargets.includes(character) && (
                  <img
                    src={checkmark}
                    alt="checkmark"
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GameBoard;
