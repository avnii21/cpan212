import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/NavBar";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  // Track current month and year (0-based month)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser || !storedUser.userId) {
      alert("Please login first");
      return;
    }
    try {
      const res = await fetch(`/api/tasks?userId=${storedUser.userId}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Move to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  // Move to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const hasTask = tasks.some((t) => {
        const taskDate = new Date(t.dueDate);
        return (
          taskDate.getFullYear() === currentYear &&
          taskDate.getMonth() === currentMonth &&
          taskDate.getDate() === i
        );
      });

      const isSelected = i === selectedDay;

      days.push(
        <div
          key={i}
          className={`calendar-day ${hasTask ? "task-day" : ""} ${
            isSelected ? "selected-day" : ""
          }`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  // Filter tasks for selected day in current month & year
  const tasksForSelectedDay =
    selectedDay != null
      ? tasks.filter((t) => {
          const taskDate = new Date(t.dueDate);
          return (
            taskDate.getFullYear() === currentYear &&
            taskDate.getMonth() === currentMonth &&
            taskDate.getDate() === selectedDay
          );
        })
      : [];

  if (loading) return <p>Loading calendar...</p>;

  // Month name for display
  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  return (
    <>
      <NavBar />
      <div className="calendar-page">
        <h2 className="calendar-title">
          {monthName} {currentYear}
        </h2>
        <div className="month-nav-buttons">
          <button onClick={handlePrevMonth}>Prev</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>

        {/* Tasks for Selected Day */}
        {selectedDay && (
          <div className="calendar-task-list">
            <h3>
              Tasks for {monthName} {selectedDay}, {currentYear}
            </h3>
            {tasksForSelectedDay.length > 0 ? (
              tasksForSelectedDay.map((task) => (
                <div key={task._id} className="calendar-task-card">
                  <p>
                    <strong>{task.title}</strong>
                  </p>
                  <p>{task.description}</p>
                  {task.tags?.length > 0 && (
                    <p>
                      <strong>Tags:</strong> {task.tags.join(", ")}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No tasks for this day.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarPage;
