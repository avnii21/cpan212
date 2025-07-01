import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Home from "./pages/Home";
import Projects from "./pages/Projects";
import UpcomingProjects from "./pages/UpcomingProjects";
import Certificates from "./pages/Certificates";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="border-frame">
        <div className="container">
          <header>
            <h1>Avni Patel</h1>
            <nav>
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/upcoming">Upcoming</Link>
                <Link to="/certificates">Certificates</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <button
              className="dark-mode-toggle"
               onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/upcoming" element={<UpcomingProjects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
