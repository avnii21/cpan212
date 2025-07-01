const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8000;

// Overview
app.get("/getOverview", (req, res) => {
  res.json({
    name: "Avni",
    title: "Full Stack Developer",
    summary: "I love creating user-friendly apps using React, Node, and Express.",
  });
});

// Projects
app.get("/getProjects", (req, res) => {
  res.json([
    {
      title: "TaskMate",
      description: "A smart task manager that breaks tasks into timelines.",
      tech: "React, Express",
    },
    {
      title: "HealthyMe",
      description: "A React Native health app using external APIs.",
      tech: "React Native, APIs",
    },
  ]);
});

// Skills
app.get("/getSkills", (req, res) => {
  res.json(["React", "Node.js", "Express", "JavaScript", "Bootstrap"]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
