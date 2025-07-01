// src/pages/Skills.jsx
import React from "react";

const Skills = () => {
  const skills = [
    "Problem-solving",
    "Debugging",
    "Microsoft Office",
    "Slack",
    "React",
    "Node.js",
    "MySQL",
    "Java",
    "Python",
    "JavaScript",
    "SQL",
    "C++",
    "Git",
    "VS Code",
    "Command Line",
    "Linux/Unix",
    "Active Directory",
  ];

  return (
    <section>
      <h2>Skills</h2>
      <ul className="list-inline">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
