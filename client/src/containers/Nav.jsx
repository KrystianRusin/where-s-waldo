import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-contents">
        <h2>Home</h2>
        <h2>Leaderboard</h2>
      </div>
      <div>
        <a href="https://github.com/KrystianRusin/where-s-waldo">
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
};

export default Nav;
