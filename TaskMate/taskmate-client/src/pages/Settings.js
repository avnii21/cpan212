import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import "../App.css";
import NavBar from "../components/NavBar";

const Settings = () => {
  const { darkMode, setDarkMode } = useOutletContext(); 

  const [notifications, setNotifications] = useState({
    taskReminders: true,
    jobAlerts: true,
  });

  const [linkedAccounts, setLinkedAccounts] = useState({
    blackboard: true,
    ticketmaster: false,
    linkedin: true,
  });


  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleLinkedAccountChange = (e) => {
    setLinkedAccounts({
      ...linkedAccounts,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <NavBar />
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>

      <section className="settings-section">
  <h3>Theme</h3>
  <label className="pill-toggle">
    <input
      type="checkbox"
      name="darkMode"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
    <span className="slider"></span>
    Dark Mode
  </label>
</section>

        <section className="settings-section">
          <h3>Notification Preferences</h3>
          <label className="pill-toggle">
            <input
              type="checkbox"
              name="taskReminders"
              checked={notifications.taskReminders}
              onChange={handleNotificationChange}
            />
            <span className="slider"></span>
            Task Reminders
          </label>
          <label className="pill-toggle">
            <input
              type="checkbox"
              name="jobAlerts"
              checked={notifications.jobAlerts}
              onChange={handleNotificationChange}
            />
            <span className="slider"></span>
            Job Alerts
          </label>
        </section>

        <section className="settings-section">
          <h3>Linked Accounts</h3>
          <label className="pill-toggle">
            <input
              type="checkbox"
              name="blackboard"
              checked={linkedAccounts.blackboard}
              onChange={handleLinkedAccountChange}
            />
            <span className="slider"></span>
            Blackboard
          </label>
          <label className="pill-toggle">
            <input
              type="checkbox"
              name="ticketmaster"
              checked={linkedAccounts.ticketmaster}
              onChange={handleLinkedAccountChange}
            />
            <span className="slider"></span>
            Ticketmaster
          </label>
          <label className="pill-toggle">
            <input
              type="checkbox"
              name="linkedin"
              checked={linkedAccounts.linkedin}
              onChange={handleLinkedAccountChange}
            />
            <span className="slider"></span>
            LinkedIn
          </label>
        </section>
      </div>
    </>
  );
};

export default Settings;
