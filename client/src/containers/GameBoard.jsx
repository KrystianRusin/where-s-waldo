import React, { useState, useEffect, useRef } from "react";
import NameModal from "../components/NameModal";
import checkTarget from "../utils/checkTarget";
import checkIfWithinCircle from "../utils/checkIfWithinCircle";
import "../styles/GameBoard.css";

const GameBoard = ({ img, difficulty }) => {
  const [scale, setScale] = useState(1);
  const [timer, setTimer] = useState(0);
  const containerRef = useRef(null);

  const [foundTargets, setFoundTargets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState(null);

  const characters = ["Waldo", "Wizard Whitebeard"];

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

    const target = await checkTarget(
      difficulty,
      character,
      clickPosition,
      containerRef.current.getBoundingClientRect().width
    );

    if (target) {
      setFoundTargets((prevFoundTargets) => [...prevFoundTargets, character]);
    }
    if (foundTargets.length === characters.length - 1) {
      setIsFinished(true);
    }

    setShowDropdown(false);
    setClickPosition(null);
  };

  return (
    <>
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
      {isFinished && <NameModal time={timer} />}
    </>
  );
};

export default GameBoard;
