import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      // Not logged in → redirect to login
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

 const handleLaunch = () => {
  if (platform === "Ticketmaster") {
    navigate("/ticketmaster");
  } else if (platform) {
    alert(`Launching ${platform} integration (mock)…`);
  } else {
    alert("Please select a platform first.");
  }
};


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavBar />
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 style={{ fontFamily: "Shrikhand, cursive" }}>
  Welcome, {user.firstName ? `${user.firstName} ${user.lastName}` : "User"}!
</h2>

        <p>Select a connected service below to simulate task alerts:</p>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          aria-label="Choose platform"
        >
          <option value="">-- Choose Platform --</option>
          <option value="Blackboard">Blackboard</option>
          <option value="Ticketmaster">Ticketmaster</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>

        <button className="launch-button" onClick={handleLaunch}>
          Launch
        </button>
        <button
  style={{
    marginTop: "20px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  }}
  onClick={() => {
    sessionStorage.removeItem("user");
    navigate("/login");
  }}
>
  Logout
</button>

      </div>
    </div>
    </> 
  );
};

export default Dashboard;
