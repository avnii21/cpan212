import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" || false;
  });


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <div
      className="app-wrapper"
      style={{
        minHeight: "100vh",
        backgroundImage: darkMode
          ? "url('/images/background-dark.png')"
          : "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease",
      }}
    >
      <header className="logo-header">
        <h1 className="logo-text">Task Mate ©</h1>
      </header>
      <main>
        <Outlet context={{ darkMode, setDarkMode }} />
      </main>
    </div>
  );
};

export default Layout;
