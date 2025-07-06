import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";

const CalendarPage = () => {
  const mockTasks = [
    {
      day: 5,
      title: "LinkedIn Job Alert",
      description: "New Software Developer role posted by Microsoft.",
    },
    {
      day: 12,
      title: "Assignment Due",
      description: "Submit CPAN212 Final Project (Phase 3).",
    },
    {
      day: 15,
      title: "Ticketmaster Reminder",
      description: "Presale access for The Weeknd concert at 10am.",
    },
    {
      day: 20,
      title: "Career Workshop",
      description: "Resume review event hosted by Humber Career Centre.",
    },
  ];

  const renderCalendar = () => {
    const daysInMonth = 31;
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const hasTask = mockTasks.some((task) => task.day === i);
      days.push(
        <div
          key={i}
          className={`calendar-day ${hasTask ? "task-day" : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <NavBar />
      <div className="calendar-page">
        <h2 className="calendar-title">Calendar View</h2>
        <div className="calendar-grid">{renderCalendar()}</div>

        <div className="calendar-task-list">
          <h3>Upcoming Events</h3>
          {mockTasks.map((task, index) => (
            <div key={index} className="calendar-task-card">
              <p><strong>Day {task.day}:</strong> {task.title}</p>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
