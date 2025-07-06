import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" activeclassname="active" exact="true">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/mytasks" activeclassname="active">
            My Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeclassname="active">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" activeclassname="active">
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeclassname="active">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
