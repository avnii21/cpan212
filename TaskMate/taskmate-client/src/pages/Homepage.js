import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="homepage"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1
        style={{
          fontFamily: "Shrikhand, cursive",
          fontSize: "60px",
          marginBottom: "30px",
        }}
      >
        Task Mate ©
      </h1>
      <button
        style={{
          fontSize: "18px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")}
      >
        Login Now
      </button>
    </div>
  );
};

export default Homepage;
