import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Notifications from "./Notifications"; // Import the Notifications component
import "./NavBar.css";

const NavBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  // Get user from session storage
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.userId;

  // Fetch unread notifications count
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/notifications/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifCount(data.length);
      })
      .catch(console.error);
  }, [userId]);

  // Toggle notification panel visibility
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")} end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/mytasks" className={({ isActive }) => (isActive ? "active" : "")}>
            My Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? "active" : "")}>
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Logout
          </NavLink>
        </li>

        {/* Notifications Button styled like NavLink */}
        {userId && (
          <li style={{ position: "relative" }}>
            <button
              onClick={toggleNotifications}
              className={`navlink-button ${showNotifications ? "active" : ""}`}
              aria-label="Toggle notifications"
            >
              Notifications
              {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <Notifications />
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
