import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";

const MyTasks = () => {
  const mockTasks = [
    {
      id: 1,
      type: "Assignment",
      title: "CPAN212 Project Phase 2",
      due: "July 5, 2025",
      description: "Build routing for both frontend and backend in TaskMate.",
    },
    {
      id: 2,
      type: "Ticket",
      title: "Drake Concert Presale",
      due: "July 10, 2025",
      description: "Buy tickets using Ticketmaster at 10am.",
    },
    {
      id: 3,
      type: "Job",
      title: "New LinkedIn Posting - Junior Dev",
      due: "Rolling Deadline",
      description: "Apply to entry-level Full Stack role at Shopify.",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="mytasks-container">
        <h2 className="mytasks-heading">My Tasks</h2>
        <div className="task-list">
          {mockTasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>
              <p><strong>Type:</strong> {task.type}</p>
              <p><strong>Due:</strong> {task.due}</p>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTasks;
