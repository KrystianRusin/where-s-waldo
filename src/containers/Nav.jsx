import React from "react";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/Nav.css";

const Nav = ({ resetDifficulty }) => {
  return (
    <div className="nav-container">
      <div className="nav-contents">
        <NavLink
          to="/"
          onClick={resetDifficulty}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Leaderboard
        </NavLink>
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
