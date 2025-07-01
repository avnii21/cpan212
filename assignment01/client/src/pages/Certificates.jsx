import React from "react";

const Certificates = () => {
  const certificates = [
    { title: "Intro to Cybersecurity", status: "Completed" },
    { title: "Introduction to Software Engineering", status: "In progress" },
    { title: "Introduction to Artificial Intelligence (AI)", status: "Completed" },
  ];

  return (
    <section className="left-align-page">
      <h2>Certificates</h2>
      <ul>
        {certificates.map((cert, idx) => (
          <li key={idx}>
            <strong>{cert.title}</strong> - {cert.status}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Certificates;
